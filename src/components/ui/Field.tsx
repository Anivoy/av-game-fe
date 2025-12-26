import type { ReactNode } from "react";
import { Field as HField, Label, Description } from "@headlessui/react";
import { cn } from "@/utils/cn";

interface FieldProps {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
}

export function Field({ label, hint, error, children }: FieldProps) {
  return (
    <HField className="flex flex-col gap-1.5">
      {label && (
        <Label className="text-sm font-semibold text-white">{label}</Label>
      )}

      {children}

      {hint && (
        <Description className={cn("text-xs", error ? "text-error-500" : "text-white/40")}>{hint}</Description>
      )}
    </HField>
  );
}
