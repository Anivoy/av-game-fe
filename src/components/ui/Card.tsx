import type { ElementType, ReactNode, ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

type CardProps<T extends ElementType = "div"> = {
  as?: T;
  children: ReactNode;
  parentClassName?: string;
  className?: string;
  noPadding?: boolean;
} & ComponentPropsWithoutRef<T>;

export default function Card<T extends ElementType = "div">({
  as,
  children,
  parentClassName,
  className,
  noPadding = false,
  ...props
}: CardProps<T>) {
  const Component = as || "div";

  return (
    <div
      className={cn(
        "p-px rounded-xl",
        "bg-linear-to-t from-card-border-from to-card-border-to",
        parentClassName
      )}
    >
      <Component
        className={cn(
          "rounded-[calc(var(--radius-xl)-1px)]",
          "bg-linear-to-b from-card-from to-card-to",
          !noPadding && "p-4 md:p-4",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    </div>
  );
}
