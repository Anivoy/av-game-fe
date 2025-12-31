import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { formatDistance } from "@/utils/format";

interface RoundDetailProps {
  distance: number | null | undefined;
  currentRound: number;
  totalRounds: number;
  roundScore: number;
  totalScore: number;
  isLoading?: boolean;
  isGameOver?: boolean;
  handleNextRound: () => Promise<void>;
}

export default function RoundDetail({
  distance,
  currentRound,
  totalRounds,
  roundScore,
  totalScore,
  isLoading = false,
  isGameOver = false,
  handleNextRound,
}: RoundDetailProps) {
  if (isLoading) {
    return (
      <Card
        noPadding
        className="flex gap-6 px-4 py-3 text-sm text-white font-semibold"
      >
        <div className="space-y-2 animate-pulse">
          <div className="h-4 w-28 bg-white/20 rounded" />
          <div className="h-8 w-24 bg-white/30 rounded" />
        </div>

        <div className="flex gap-6 animate-pulse">
          <div className="space-y-2">
            <div className="h-4 w-10 bg-white/20 rounded" />
            <div className="h-8 w-16 bg-white/30 rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-16 bg-white/20 rounded" />
            <div className="h-8 w-20 bg-white/30 rounded" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-16 bg-white/20 rounded" />
            <div className="h-8 w-20 bg-white/30 rounded" />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      noPadding
      className="flex gap-6 items-center justify-between px-4 py-3 text-sm text-white font-semibold"
    >
      <div>
        <h2>Distance to Location</h2>
        <h1 className="italic text-2xl">{formatDistance(distance)}</h1>
      </div>
      <div className="flex gap-6 items-center">
        <div>
          <h6>Round</h6>
          <p className="italic text-2xl">
            {currentRound}
            <span className="text-base text-white/50">/{totalRounds}</span>
          </p>
        </div>
        <div>
          <h6>Round Score</h6>
          <p className="italic text-2xl">{roundScore}</p>
        </div>
        <div>
          <h6>Total Score</h6>
          <p className="italic text-2xl">{totalScore}</p>
        </div>
        <div>
          <Button size="md" color="primary" onClick={handleNextRound}>
            {isGameOver ? "Finish Game" : "Next Round"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
