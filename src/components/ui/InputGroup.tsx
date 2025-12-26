import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface InputGroupProps {
  start?: ReactNode;
  end?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function InputGroup({
  start,
  end,
  children,
  className,
}: InputGroupProps) {
  return (
    <div
      className={cn(
        "relative flex items-center min-w-0 overflow-hidden",
        "rounded-lg",
        "bg-background/30",
        "border border-white/20",
        "focus-within:ring-1 focus-within:ring-card-border-to/80",
        className
      )}
    >
      {start && (
        <span className="pl-3 pr-2 text-white/40 flex items-center justify-center">
          {start}
        </span>
      )}

      <div className="flex-1">{children}</div>

      {end && (
        <span className="pr-3 pl-2 flex items-center justify-center">{end}</span>
      )}
    </div>
  );
}
