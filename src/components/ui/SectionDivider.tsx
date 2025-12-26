import { cn } from "@/utils/cn";

type DividerProps = {
  className?: string;
};

export default function SectionDivider({ className }: DividerProps) {
  return (
    <div
      className={cn(
        "h-px bg-linear-to-r",
        "from-card-border-to/0 via-card-border-to/50 to-card-border-to/0",
        className
      )}
    />
  );
}
