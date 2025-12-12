// app/lib/pdf2img.ts
export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

let pdfjsLib: any = null;
let loadPromise: Promise<any> | null = null;

/**
 * Load pdf.js core and worker and set workerSrc to the emitted worker URL (Vite-friendly).
 */
async function loadPdfJs(): Promise<any> {
  // Ensure this runs only in the browser (avoid SSR issues)
  if (typeof window === "undefined") {
    throw new Error("pdfjs can only be loaded in the browser");
  }

  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  loadPromise = Promise.all([
    // Use the ESM module for pdf core
    import("pdfjs-dist/build/pdf.min.mjs"),
    // Ask Vite to return the worker as an emitted asset URL
    import("pdfjs-dist/build/pdf.worker.min.mjs?url"),
  ]).then(([lib, workerSrc]) => {
    // workerSrc is a module with a default export which is the URL string
    lib.GlobalWorkerOptions.workerSrc = (workerSrc as any).default;
    pdfjsLib = lib;
    return lib;
  });

  return loadPromise;
}

export async function convertPdfToImage(file: File): Promise<PdfConversionResult> {
  try {
    // Guard: ensure running in browser
    if (typeof window === "undefined") {
      return {
        imageUrl: "",
        file: null,
        error: "PDF conversion must run in the browser.",
      };
    }

    const lib = await loadPdfJs();

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);

    // tweak scale as you need (4 gives high-res)
    const viewport = page.getViewport({ scale: 4 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);

    if (context) {
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
    }

    await page.render({ canvasContext: context!, viewport }).promise;

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const originalName = file.name.replace(/\.pdf$/i, "");
            const imageFile = new File([blob], `${originalName}.png`, {
              type: "image/png",
            });

            resolve({
              imageUrl: URL.createObjectURL(blob),
              file: imageFile,
            });
          } else {
            resolve({
              imageUrl: "",
              file: null,
              error: "Failed to create image blob",
            });
          }
        },
        "image/png",
        1.0
      );
    });
  } catch (err: any) {
    return {
      imageUrl: "",
      file: null,
      error: `Failed to convert PDF: ${err?.message ?? String(err)}`,
    };
  }
}
