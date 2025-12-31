import { motion, type Variants } from "framer-motion";
import { HeroBackground } from "@/components/common/HeroBackground";
import ScrollIndicator from "@/components/common/ScrollIndicator";
import Button from "@/components/ui/Button";
import { MapPinned } from "lucide-react";
import { Link } from "react-router";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "backInOut",
    },
  },
};

const scrollIndicatorVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "backInOut",
    },
  },
};

export default function Hero() {
  return (
    <section className="relative responsive-container h-[88dvh] overflow-hidden">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
      >
        <HeroBackground
          leftImage="/images/background/a-jumbotron.png"
          rightImage="/images/background/b-jumbotron.webp"
          animate
        />
      </motion.div>

      <div className="relative z-40 h-full">
        <motion.div
          className="max-w-xl h-full pt-[2%] flex flex-col justify-center gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants}>
            <h1 className="font-heading text-2xl md:text-5xl 2xl:text-6xl mb-2 md:mb-3 2xl:mb-4 font-semibold">
              Anime Voyager
            </h1>
            <h2 className="font-semibold text-lg">
              Where Anime Worlds Come Alive
            </h2>
          </motion.div>

          <motion.p className="text-balance" variants={itemVariants}>
            Explore real-world locations behind iconic anime scenes. Guess the
            place, earn points, and challenge the world.
          </motion.p>

          <div>
            <div className="pt-6 flex gap-4 items-center">
              <motion.div variants={itemVariants}>
                <Button
                  as={Link}
                  to="/game-mode"
                  size="md"
                  color="secondary"
                  animate
                >
                  Select Mode
                </Button>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button
                  as={Link}
                  to="/play"
                  size="md"
                  color="primary"
                  endIcon={<MapPinned size={20} />}
                  animate
                >
                  Quick Play
                </Button>
              </motion.div>
            </div>
            <p className="italic text-xs text-white/80 mt-4">
              <motion.span variants={itemVariants}>
                {"Free to play · "}
              </motion.span>
              <motion.span variants={itemVariants}>
                {"50,000+ scenes guessed daily · "}
              </motion.span>
              <motion.span variants={itemVariants}>Updated weekly</motion.span>
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute z-40 bottom-20 left-1/2 translate-x-[-50%]"
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate="show"
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  );
}
