import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

interface ChipProps {
  children?: ReactNode;
  size?: "sm" | "md";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  className?: string;
}

export default function Chip({
  children,
  size = "md",
  color = "primary",
  startIcon,
  endIcon,
  className,
}: ChipProps) {
  const palettes = {
    primary: cn(
      "bg-gradient-to-b",
      "from-primary-from",
      "to-primary-to",
      "shadow-inner-highlight"
    ),
    secondary: cn(
      "bg-gradient-to-t",
      "from-secondary-from",
      "to-secondary-to",
      "shadow-inner-highlight"
    ),
    success: cn(
      "bg-gradient-to-t",
      "from-success-from",
      "to-success-to",
      "shadow-inner-highlight"
    ),
    warning: cn(
      "bg-gradient-to-t",
      "from-warning-from",
      "to-warning-to",
      "shadow-inner-highlight"
    ),
    error: cn(
      "bg-gradient-to-t",
      "from-error-from",
      "to-error-to",
      "shadow-inner-highlight"
    ),
  };

  const sizes = {
    sm: "px-3 py-2 text-xs font-semibold",
    md: "px-4 py-3 text-sm font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full select-none",
        sizes[size],
        palettes[color],
        className
      )}
    >
      {startIcon}
      {children}
      {endIcon}
    </span>
  );
}
