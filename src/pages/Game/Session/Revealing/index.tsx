import { useRef, useState } from "react";
import { useGameStore } from "@/stores/game.store";

import RevealMap from "./RevealMap";
import RevealDetail from "./RevealDetail";
import RoundDetail from "./RoundDetail";
import Button from "@/components/ui/Button";

import { ChevronLeft } from "lucide-react";
import { cn } from "@/utils/cn";

export default function RevealPage() {
  const [asideExpanded, setAsideExpanded] = useState(true);

  const {
    currentRound,
    totalRounds,
    totalScore,
    revealedScene,
    lastRoundResult,
    isGameOver,
    isLoading,
    nextRound,
  } = useGameStore();

  const snapshotRef = useRef<any>(null);

  if (!isLoading && snapshotRef.current === null) {
    snapshotRef.current = structuredClone({
      currentRound,
      totalRounds,
      totalScore,
      revealedScene,
      lastRoundResult
    })
  }

  const snapshot = snapshotRef.current;

  return (
    <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end">
      <div className="absolute inset-0 -z-10 pointer-events-auto">
        <RevealMap
          guessedLocation={snapshot?.lastRoundResult?.guess}
          revealedLocation={{
            latitude: snapshot?.revealedScene?.latitude ?? 0,
            longitude: snapshot?.revealedScene?.longitude ?? 0,
          }}
        />
      </div>

      <div className="relative h-full w-full pointer-events-none">
        <aside
          className={cn(
            "absolute p-3 pl-0 top-0 right-0 bottom-[90px]",
            "w-[360px] min-w-0 shrink-0",
            "flex pointer-events-auto transition-all duration-300",
            asideExpanded ? "translate-x-0" : "translate-x-[360px]"
          )}
        >
          <div className="absolute top-1/2 translate-y-[-50%] right-full">
            <Button
              size="sm"
              color="primary"
              onClick={() => setAsideExpanded(!asideExpanded)}
              className="py-8 px-1 rounded-none rounded-l-2xl"
              startIcon={
                <ChevronLeft
                  className={cn(
                    "w-5 h-5 transition-all duration-300",
                    asideExpanded ? "rotate-180" : "rotate-0"
                  )}
                />
              }
            ></Button>
          </div>
          <RevealDetail
            isLoading={isLoading && !snapshot}
            referenceUrl={snapshot?.revealedScene?.reference}
            snippetUrl={snapshot?.revealedScene?.snippet}
            sceneTitle={snapshot?.revealedScene?.name ?? "-"}
            sceneDescription={snapshot?.revealedScene?.description ?? "-"}
            showTitle={snapshot?.revealedScene?.showTitle ?? "-"}
            sceneLocation={{
              latitude: snapshot?.revealedScene?.latitude ?? 0,
              longitude: snapshot?.revealedScene?.longitude ?? 0,
            }}
            sceneLocationDetails={snapshot?.revealedScene?.location}
            difficulty={snapshot?.revealedScene?.difficulty}
          />
        </aside>

        <div className="absolute p-3 bottom-0 left-1/2 -translate-x-1/2 w-full pointer-events-auto">
          <RoundDetail
            distance={snapshot?.lastRoundResult?.distance}
            currentRound={snapshot?.currentRound}
            totalRounds={snapshot?.totalRounds}
            roundScore={snapshot?.lastRoundResult?.score ?? 0}
            totalScore={snapshot?.totalScore}
            isGameOver={isGameOver}
            handleNextRound={nextRound}
          />
        </div>
      </div>
    </section>
  );
}
