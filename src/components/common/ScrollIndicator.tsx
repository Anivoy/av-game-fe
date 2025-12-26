import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <div className="text-white/70">
      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-nowrap">Scroll Below</span>
        <ChevronDown className="h-5 w-5 animate-scroll-pulse" />
      </div>
    </div>
  );
}
