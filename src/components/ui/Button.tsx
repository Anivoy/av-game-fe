import type { ReactNode, ElementType } from "react";
import {
  Button as HButton,
  type ButtonProps as HButtonProps,
} from "@headlessui/react";
import { motion, useAnimation } from "framer-motion";
import { Loader } from "lucide-react";
import { cn } from "@/utils/cn";

type VariantProps = {
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  loading?: boolean;
  animate?: boolean;
  fullWidth?: boolean;
  className?: string;
};

type Props<TTag extends ElementType = "button"> = VariantProps &
  Omit<HButtonProps<TTag>, "className" | "children" | "color">;

function Button<TTag extends ElementType = "button">({
  as,
  children,
  size = "md",
  color = "primary",
  startIcon,
  endIcon,
  loading = false,
  animate = false,
  disabled = false,
  fullWidth = false,
  className,
  ...props
}: Props<TTag>) {
  const isDisabled = disabled || loading;

  const palettes = {
    primary: {
      base: cn(
        "bg-gradient-to-b",
        "from-primary-from",
        "to-primary-to",
        "shadow-inner-highlight"
      ),
      hover: "data-[hover]:brightness-120",
      active: "data-[active]:brightness-80",
      disabled: cn(
        "data-[disabled]:brightness-80",
        "data-[disabled]:opacity-80"
      ),
    },
    secondary: {
      base: cn(
        "bg-gradient-to-t",
        "from-secondary-from",
        "to-secondary-to",
        "shadow-inner-highlight"
      ),
      hover: "data-[hover]:brightness-120",
      active: "data-[active]:brightness-80",
      disabled: cn(
        "data-[disabled]:brightness-80",
        "data-[disabled]:opacity-80"
      ),
    },
    success: {
      base: cn(
        "bg-gradient-to-b",
        "from-success-from",
        "to-success-to",
        "shadow-inner-highlight"
      ),
      hover: "data-[hover]:brightness-120",
      active: "data-[active]:brightness-80",
      disabled: cn(
        "data-[disabled]:brightness-80",
        "data-[disabled]:opacity-80"
      ),
    },
    warning: {
      base: cn(
        "bg-gradient-to-b",
        "from-warning-from",
        "to-warning-to",
        "shadow-inner-highlight"
      ),
      hover: "data-[hover]:brightness-120",
      active: "data-[active]:brightness-80",
      disabled: cn(
        "data-[disabled]:brightness-80",
        "data-[disabled]:opacity-80"
      ),
    },
    error: {
      base: cn(
        "bg-gradient-to-b",
        "from-error-from",
        "to-error-to",
        "shadow-inner-highlight"
      ),
      hover: "data-[hover]:brightness-120",
      active: "data-[active]:brightness-80",
      disabled: cn(
        "data-[disabled]:brightness-80",
        "data-[disabled]:opacity-80"
      ),
    },
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4",
  };

  const buttonContent = (
    <>
      {loading && <Loader className="h-4 w-4 animate-spin" />}
      {!loading && startIcon}
      {children}
      {!loading && endIcon}
    </>
  );

  const buttonClasses = cn(
    fullWidth ? "flex w-full" : "inline-flex",
    "items-center justify-center gap-2 rounded-full font-semibold italic cursor-pointer",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    sizes[size],
    palettes[color].base,
    palettes[color].active,
    palettes[color].disabled,
    isDisabled && "cursor-not-allowed opacity-50",
    !animate && cn(palettes[color].hover, "transition"),
    className
  );

  if (animate && !isDisabled) {
    const controls = useAnimation();

    return (
      <motion.div
        animate={controls}
        onHoverStart={() => {
          controls.start({
            scale: 1.05,
            rotate: Math.random() * 4 - 2,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 17,
            },
          });
        }}
        onHoverEnd={() => {
          controls.start({
            scale: 1,
            rotate: 0,
            transition: {
              type: "spring",
              stiffness: 400,
              damping: 17,
            },
          });
        }}
        className={fullWidth ? "w-full" : "inline-block"}
      >
        <HButton
          as={as}
          disabled={isDisabled}
          className={buttonClasses}
          {...props}
        >
          {buttonContent}
        </HButton>
      </motion.div>
    );
  }

  return (
    <HButton as={as} disabled={isDisabled} className={buttonClasses} {...props}>
      {buttonContent}
    </HButton>
  );
}

export default Button;
