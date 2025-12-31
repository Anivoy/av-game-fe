import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import type { Difficulty, Location } from "@/types/game.type";
import { cn } from "@/utils/cn";
import { SquareArrowOutUpRight } from "lucide-react";

export type SceneLocationDetails = {
  city?: string;
  prefecture?: string;
  region?: string;
};

interface RevealDetailProps {
  snippetUrl: string | undefined;
  referenceUrl: string | undefined;
  sceneTitle: string;
  sceneDescription: string;
  showTitle: string;
  difficulty: Difficulty | undefined;
  sceneLocation: Location;
  sceneLocationDetails: SceneLocationDetails | undefined;
  isLoading: boolean;
}

const difficultyColorMap: Record<string, "success" | "warning" | "error"> = {
  green: "success",
  yellow: "warning",
  red: "error",
};

export default function RevealDetail({
  snippetUrl,
  referenceUrl,
  sceneTitle,
  sceneDescription,
  showTitle,
  difficulty,
  sceneLocation,
  sceneLocationDetails,
  isLoading,
}: RevealDetailProps) {
  if (isLoading) return <RevealDetailSkeleton />;

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${sceneLocation.latitude},${sceneLocation.longitude}`;

  return (
    <Card
      parentClassName="min-w-0 w-full"
      className="h-full overflow-y-auto flex flex-col"
      noPadding
    >
      <div
        className={cn(
          "px-4 py-3",
          "sticky top-0 z-10",
          "text-white font-semibold leading-relaxed",
          "border-b border-card-border-to/30"
        )}
      >
        Details
      </div>
      <div className="p-4 space-y-4 text-white flex-1 overflow-y-auto">
        <div className="space-y-2">
          <h6 className="text-sm font-semibold">Snippet (Show)</h6>
          <div className="aspect-video rounded overflow-hidden bg-white/10">
            <img
              src={snippetUrl}
              alt="Snippet"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="space-y-2">
          <h6 className="text-sm font-semibold">Reference (Real Location)</h6>
          <div className="aspect-video rounded overflow-hidden bg-white/10">
            <img
              src={referenceUrl}
              alt="Reference"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex gap-2 items-center underline text-white/80 text-sm"
          >
            <SquareArrowOutUpRight className="w-4 h-4 mt-1" />
            Open in Google Maps
          </a>
        </div>
        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{sceneTitle}</h3>
            <p className="text-sm font-semibold text-white/80">{showTitle}</p>
          </div>

          {(difficulty || sceneLocationDetails) && (
            <div className="flex gap-2 overflow-x-auto pt-1 pb-2">
              {difficulty?.name && (
                <Chip
                  color={
                    difficultyColorMap[difficulty.colorCode] ?? "secondary"
                  }
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {difficulty.name}
                </Chip>
              )}
              {sceneLocationDetails?.city && (
                <Chip color="secondary" size="sm" className="whitespace-nowrap">
                  {sceneLocationDetails?.city}
                </Chip>
              )}
              {sceneLocationDetails?.prefecture && (
                <Chip color="secondary" size="sm" className="whitespace-nowrap">
                  {sceneLocationDetails.prefecture}
                </Chip>
              )}
              {sceneLocationDetails?.region && (
                <Chip color="secondary" size="sm" className="whitespace-nowrap">
                  {sceneLocationDetails.region}
                </Chip>
              )}
            </div>
          )}

          <p className="text-sm text-white/60 leading-relaxed">
            {sceneDescription}
          </p>
        </div>
      </div>
    </Card>
  );
}

function RevealDetailSkeleton() {
  return (
    <Card
      parentClassName="min-w-0 w-full"
      className="h-full overflow-y-auto flex flex-col"
      noPadding
    >
      {/* Header Skeleton */}
      <div className="px-4 py-3 border-b border-white/20">
        <div className="h-5 w-20 bg-white/30 rounded animate-pulse" />
      </div>

      <div className="p-4 space-y-6 flex-1 overflow-hidden w-full">
        {/* Image Skeletons */}
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-2 animate-pulse">
              <div className="h-3 w-24 bg-white/30 rounded" />
              <div className="aspect-video w-full bg-white/30 rounded-lg" />
            </div>
          ))}
        </div>

        {/* Text Section Skeleton */}
        <div className="space-y-4 animate-pulse">
          <div className="space-y-2">
            <div className="h-6 w-3/4 bg-white/30 rounded" />
            <div className="h-4 w-1/2 bg-white/30 rounded" />
          </div>

          {/* Chips Skeleton */}
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-white/30 rounded-full" />
            <div className="h-6 w-20 bg-white/30 rounded-full" />
            <div className="h-6 w-24 bg-white/30 rounded-full" />
          </div>

          {/* Paragraph Skeleton */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-white/30 rounded" />
            <div className="h-3 w-full bg-white/30 rounded" />
            <div className="h-3 w-2/3 bg-white/30 rounded" />
          </div>
        </div>
      </div>
    </Card>
  );
}
