import { forwardRef } from "react";
import {
  Input as HInput,
  type InputProps as HInputProps,
} from "@headlessui/react";
import { cn } from "@/utils/cn";

type Props = HInputProps<"input">;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    return (
      <HInput
        ref={ref}
        className={cn(
          "w-full bg-transparent text-white placeholder:text-white/40",
          "px-3 py-2",
          "focus:outline-none",
          "data-disabled:opacity-50 data-disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
