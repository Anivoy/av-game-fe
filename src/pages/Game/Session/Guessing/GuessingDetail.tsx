import Card from "@/components/ui/Card";

interface GuessingDetailProps {
  mode: string;
  currentRound: number;
  totalRounds: number;
  totalScore: number;
  isLoading?: boolean;
}

export default function GuessingDetail({
  mode,
  currentRound,
  totalRounds,
  totalScore,
  isLoading = false,
}: GuessingDetailProps) {
  
  if (isLoading) {
    return (
      <Card
        noPadding
        className="flex gap-6 px-4 py-3 text-sm text-white font-semibold"
      >
        {["Mode", "Round", "Total Score"].map((label) => (
          <div key={label} className="space-y-2 animate-pulse">
            <div className="h-4 w-12 bg-white/20 rounded" />
            <div className="h-8 w-24 bg-white/30 rounded" />
          </div>
        ))}
      </Card>
    );
  }

  return (
    <Card
      noPadding
      className="flex gap-6 px-4 py-3 text-sm text-white font-semibold"
    >
      <div>
        <h2>Mode</h2>
        <h1 className="italic text-2xl">{mode}</h1>
      </div>
      <div>
        <h6>Round</h6>
        <p className="italic text-2xl">
          {currentRound}
          <span className="text-base text-white/50">/{totalRounds}</span>
        </p>
      </div>
      <div>
        <h6>Total Score</h6>
        <p className="italic text-2xl">{totalScore}</p>
      </div>
    </Card>
  );
}