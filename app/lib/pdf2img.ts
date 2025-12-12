// app/lib/pdf2img.ts
export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

let pdfjsLib: any = null;
let loadPromise: Promise<any> | null = null;

/**
 * Load pdfjs core and worker (via Vite's ?url) so workerSrc is a valid URL.
 * This avoids SSR/bundler import issues and ensures the worker matches the library version.
 */
async function loadPdfJs(): Promise<any> {
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  // Dynamically import both library and worker URL (Vite will return a URL when using ?url)
  loadPromise = Promise.all([
    import("pdfjs-dist/build/pdf.min.mjs"),
    import("pdfjs-dist/build/pdf.worker.min.mjs?url"),
  ]).then(([lib, workerUrl]) => {
    // workerUrl.default is the URL string returned by Vite for the worker file
    (lib as any).GlobalWorkerOptions.workerSrc = (workerUrl as any).default;
    pdfjsLib = lib;
    return lib;
  });

  return loadPromise;
}

/**
 * Convert first page of PDF file -> PNG File and object URL.
 */
export async function convertPdfToImage(file: File): Promise<PdfConversionResult> {
  try {
    if (typeof window === "undefined") {
      return { imageUrl: "", file: null, error: "PDF conversion must run in the browser" };
    }

    const lib = await loadPdfJs();

    const arrayBuffer = await file.arrayBuffer();
    const loadingTask = lib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    const page = await pdf.getPage(1);

    // Increase scale for better resolution if needed
    const scale = 2;
    const viewport = page.getViewport({ scale });

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = Math.round(viewport.width);
    canvas.height = Math.round(viewport.height);

    if (context) {
      context.imageSmoothingEnabled = true;
      // imageSmoothingQuality has limited TypeScript support in some libs; ignore if not present
      try {
        (context as any).imageSmoothingQuality = "high";
      } catch {}
    }

    await page.render({ canvasContext: context!, viewport }).promise;

    const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/png"));
    if (!blob) {
      return { imageUrl: "", file: null, error: "Failed to create image blob" };
    }

    const originalName = file.name.replace(/\.pdf$/i, "");
    const imageFile = new File([blob], `${originalName}.png`, { type: "image/png" });

    // cleanup
    try {
      pdf.destroy();
    } catch {}

    return { imageUrl: URL.createObjectURL(blob), file: imageFile };
  } catch (err: any) {
    console.error("convertPdfToImage error:", err);
    return { imageUrl: "", file: null, error: String(err) };
  }
}
