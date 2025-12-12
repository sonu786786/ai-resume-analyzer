import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

type Tip = { type: "good" | "improve"; tip: string; explanation: string };
type Cat = { score?: number | null; tips?: Tip[] | null };
type FeedbackShape = {
  toneAndStyle?: Cat | null;
  content?: Cat | null;
  structure?: Cat | null;
  skills?: Cat | null;
  // other fields...
};

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

const ScoreBadge = ({ score }: { score: number }) => {
  return (
    <div
      className={cn(
        "flex flex-row gap-1 items-center px-2 py-0.5 rounded-[96px]",
        score > 69 ? "bg-badge-green" : score > 39 ? "bg-badge-yellow" : "bg-badge-red"
      )}
    >
      <img
        src={score > 69 ? "/icons/check.svg" : "/icons/warning.svg"}
        alt="score"
        className="size-4"
      />
      <p
        className={cn(
          "text-sm font-medium",
          score > 69
            ? "text-badge-green-text"
            : score > 39
            ? "text-badge-yellow-text"
            : "text-badge-red-text"
        )}
      >
        {score}/100
      </p>
    </div>
  );
};

const CategoryHeader = ({ title, categoryScore }: { title: string; categoryScore: number }) => {
  return (
    <div className="flex flex-row gap-4 items-center py-2">
      <p className="text-2xl font-semibold">{title}</p>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({ tips }: { tips: Tip[] }) => {
  // ensure tips is an array
  const safeTips = Array.isArray(tips) ? tips : [];

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="bg-gray-50 w-full rounded-lg px-5 py-4 grid grid-cols-2 gap-4">
        {safeTips.map((tip, index) => (
          <div className="flex flex-row gap-2 items-center" key={index}>
            <img
              src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
              alt="score"
              className="size-5"
            />
            <p className="text-xl text-gray-500 ">{tip.tip}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 w-full">
        {safeTips.map((tip, index) => (
          <div
            key={index + "|" + tip.tip}
            className={cn(
              "flex flex-col gap-2 rounded-2xl p-4",
              tip.type === "good"
                ? "bg-green-50 border border-green-200 text-green-700"
                : "bg-yellow-50 border border-yellow-200 text-yellow-700"
            )}
          >
            <div className="flex flex-row gap-2 items-center">
              <img
                src={tip.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"}
                alt="score"
                className="size-5"
              />
              <p className="text-xl font-semibold">{tip.tip}</p>
            </div>
            <p>{tip.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback?: FeedbackShape | null }) => {
  // If no feedback, render placeholder (or null)
  if (!feedback) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold">Detailed Feedback</h3>
          <p className="text-sm text-gray-500 mt-2">No detailed feedback available.</p>
        </div>
      </div>
    );
  }

  // Normalize each category to avoid undefined access
  const tone = feedback.toneAndStyle ?? { score: 0, tips: [] as Tip[] };
  const content = feedback.content ?? { score: 0, tips: [] as Tip[] };
  const structure = feedback.structure ?? { score: 0, tips: [] as Tip[] };
  const skills = feedback.skills ?? { score: 0, tips: [] as Tip[] };

  const toneScore = clamp(Number(tone.score ?? 0));
  const contentScore = clamp(Number(content.score ?? 0));
  const structureScore = clamp(Number(structure.score ?? 0));
  const skillsScore = clamp(Number(skills.score ?? 0));

  return (
    <div className="flex flex-col gap-4 w-full">
      <Accordion>
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader title="Tone & Style" categoryScore={toneScore} />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={Array.isArray(tone.tips) ? tone.tips : []} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader title="Content" categoryScore={contentScore} />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={Array.isArray(content.tips) ? content.tips : []} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader title="Structure" categoryScore={structureScore} />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={Array.isArray(structure.tips) ? structure.tips : []} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader title="Skills" categoryScore={skillsScore} />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={Array.isArray(skills.tips) ? skills.tips : []} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;
