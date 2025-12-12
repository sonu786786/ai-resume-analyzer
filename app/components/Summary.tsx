import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

type ScoreObj = { score?: number | null };
type FeedbackShape = {
  overallScore?: number | null;
  toneAndStyle?: ScoreObj | null;
  content?: ScoreObj | null;
  structure?: ScoreObj | null;
  skills?: ScoreObj | null;
  // add other fields if needed
};

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

const Category = ({ title, score }: { title: string; score: number }) => {
  const textColor =
    score > 70 ? "text-green-600" : score > 49 ? "text-yellow-600" : "text-red-600";

  return (
    <div className="resume-summary">
      <div className="category">
        <div className="flex flex-row gap-2 items-center justify-center">
          <p className="text-2xl">{title}</p>
          <ScoreBadge score={score} />
        </div>
        <p className="text-2xl">
          <span className={textColor}>{score}</span>/100
        </p>
      </div>
    </div>
  );
};

const Summary = ({ feedback }: { feedback?: FeedbackShape | null }) => {
  // If there's no feedback at all, show a placeholder (avoids crashes)
  if (!feedback) {
    return (
      <div className="bg-white rounded-2xl shadow-md w-full p-6">
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 rounded-full bg-gray-100" />
          <div>
            <h2 className="text-2xl font-bold">Your Resume Score</h2>
            <p className="text-sm text-gray-500">No score available yet.</p>
          </div>
        </div>
      </div>
    );
  }

  // Safely read nested scores and provide sensible defaults
  const overall = clamp(Number(feedback.overallScore ?? 0));
  const toneScore = clamp(Number(feedback.toneAndStyle?.score ?? 0));
  const contentScore = clamp(Number(feedback.content?.score ?? 0));
  const structureScore = clamp(Number(feedback.structure?.score ?? 0));
  const skillsScore = clamp(Number(feedback.skills?.score ?? 0));

  return (
    <div className="bg-white rounded-2xl shadow-md w-full">
      <div className="flex flex-row items-center p-4 gap-8">
        <ScoreGauge score={overall} />

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">Your Resume Score</h2>
          <p className="text-sm text-gray-500">
            This score is calculated based on the variables listed below.
          </p>
        </div>
      </div>

      <Category title="Tone & Style" score={toneScore} />
      <Category title="Content" score={contentScore} />
      <Category title="Structure" score={structureScore} />
      <Category title="Skills" score={skillsScore} />
    </div>
  );
};

export default Summary;
