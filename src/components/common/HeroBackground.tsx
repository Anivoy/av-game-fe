import { motion, type Variants } from "framer-motion";

interface HeroBackgroundProps {
  leftImage: string;
  rightImage: string;
  animate?: boolean; // default: false (no animation)
}

const slideInLeft: Variants = {
  hidden: { x: -100 },
  show: {
    x: 0,
    transition: {
      duration: 1,
      ease: "anticipate",
    },
  },
};

const slideInRight: Variants = {
  hidden: { x: 100 },
  show: {
    x: 0,
    transition: {
      duration: 1,
      ease: "anticipate",
    },
  },
};

export function HeroBackground({
  leftImage,
  rightImage,
  animate = false,
}: HeroBackgroundProps) {
  const motionPropsLeft = animate
    ? { variants: slideInLeft, initial: "hidden", animate: "show" }
    : {};

  const motionPropsRight = animate
    ? { variants: slideInRight, initial: "hidden", animate: "show" }
    : {};

  return (
    <>
      {/* LEFT (clipped) */}
      <motion.div
        className="absolute inset-0 z-10 hidden md:block"
        {...motionPropsLeft}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${leftImage})`,
            clipPath: "polygon(0 0, 55% 0, 45% 100%, 0 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            clipPath: "polygon(0 0, 55% 0, 45% 100%, 0 100%)",
          }}
        >
          <div className="h-full w-full bg-linear-to-b from-background-dark/90 to-background/30" />
        </div>
      </motion.div>

      {/* RIGHT (mirrored) */}
      <motion.div
        className="absolute inset-0 z-0 hidden md:block"
        {...motionPropsRight}
      >
        <div
          className="absolute inset-0 bg-cover bg-center scale-x-[-1]"
          style={{ backgroundImage: `url(${rightImage})` }}
        />
        <div className="absolute inset-0 bg-background/25" />
      </motion.div>

      {/* BOTTOM OVERLAY */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-48 hidden md:block pointer-events-none bg-linear-to-b from-transparent/80 to-background" />

      {/* MOBILE */}
      <div className="absolute inset-0 z-0 md:hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${rightImage})` }}
        />
      </div>
    </>
  );
}
