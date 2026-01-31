import { useRef, useState } from "react";
import { useGameStore } from "@/stores/game.store";

import Button from "@/components/ui/Button";
import GuessingDetail from "./GuessingDetail";
import GuessingMap from "./GuessingMap";
import Snippet from "./Snippet";

import { Sparkles } from "lucide-react";
import { cn } from "@/utils/cn";

export default function GuessingPage() {
  const [mapExpanded, setMapExpanded] = useState(false);

  const {
    gameMode,
    currentRound,
    totalRounds,
    totalScore,
    guessingScene,
    userGuess,
    isSubmitting,
    isLoading,
    setGuess,
    submitGuess,
  } = useGameStore();

  const snapshotRef = useRef<any>(null);

  if (!isLoading && snapshotRef.current === null) {
    snapshotRef.current = structuredClone({
      guessingScene,
      currentRound,
      totalRounds,
      totalScore
    });
  }

  const snapshot = snapshotRef.current;

  return (
    <section className="relative px-8 py-12 h-screen w-full flex flex-col justify-end">
      {/* <div className="flex items-center justify-center">
          <Card
            noPadding
            parentClassName="rounded-full"
            className="rounded-full px-8 py-2 flex items-center justify-center"
          >
            <span className="text-xl italic font-semibold text-white">01:32</span>
          </Card>
        </div> */}

      <div className="flex items-end justify-between gap-6">
        <div className="space-y-4">
          <Button
            className="min-w-28"
            startIcon={<Sparkles className="w-5 h-5" />}
            disabled
          >
            Hint
          </Button>
          <GuessingDetail
            mode={gameMode ?? ""}
            currentRound={snapshot?.currentRound}
            totalRounds={snapshot?.totalRounds}
            totalScore={snapshot?.totalScore}
            isLoading={isLoading}
          />
        </div>
        <div
          className={cn(
            "flex flex-col gap-4 w-full",
            mapExpanded ? "max-w-[640px]" : "max-w-[360px]"
          )}
        >
          <GuessingMap
            expanded={mapExpanded}
            setExpanded={setMapExpanded}
            selected={userGuess}
            onSelected={(location) => setGuess(location)}
          />
          <Button
            disabled={!userGuess || isLoading || isSubmitting}
            loading={isSubmitting}
            fullWidth
            type="button"
            onClick={submitGuess}
          >
            {!userGuess ? "Select a Location on Map" : "Submit Guess"}
          </Button>
        </div>
      </div>
      <Snippet src={snapshot?.guessingScene?.snippet} isLoading={isLoading} />
    </section>
  );
}
