import { Loader } from "lucide-react";
import { cn } from "@/utils/cn";

interface SnippetProps {
  src?: string;
  isLoading?: boolean;
  isTimeRunningOut?: boolean;
}

export default function Snippet({
  src,
  isLoading,
  isTimeRunningOut = false,
}: SnippetProps) {
  return (
    <div className="absolute -z-10 inset-0 w-full h-full flex items-center justify-center overflow-hidden">
      {!isLoading && src ? (
        <img
          src={src}
          alt="Scene snippet"
          className="w-full h-full object-cover object-center"
        />
      ) : (
        <Loader className="w-12 h-12 text-primary animate-spin" />
      )}

      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-500",
          "shadow-[inset_0_0_180px_rgba(220,38,38,0.5)]",
          isTimeRunningOut ? "opacity-80 animate-pulse" : "opacity-0"
        )}
      />

      {/* <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/10 via-transparent to-black/10" /> */}
    </div>
  );
}
