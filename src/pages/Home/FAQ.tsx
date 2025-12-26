import { motion, type Variants } from "framer-motion";
import { Accordion } from "@/components/ui/Accordion";

const contents = [
  {
    question: "Is Anivoy really free?",
    answer:
      "Yes! Anivoy is completely free to play. You’ll need to create an account to start playing, which helps us save your progress, track scores, and support leaderboards and multiplayer features.",
  },
  {
    question: "Do I need to create an account to play?",
    answer:
      "Yes. Creating an account is required to play Anivoy. This allows us to store your guesses, stats, rankings, and match you with friends and players around the world.",
  },
  {
    question: "What anime are included in the game?",
    answer:
      "We feature locations from 500+ anime series and movies, including popular titles like Your Name, Steins;Gate, K-On!, Demon Slayer, and many more. New anime and locations are added regularly.",
  },
  {
    question: "Are all scenes located in Japan?",
    answer:
      "Most scenes are based on real locations in Japan, as many anime take inspiration from real cities, towns, and landmarks. Some special modes may include fictional or inspired locations as well.",
  },
  {
    question: "How does the scoring system work?",
    answer:
      "Your score is based on how close your guess is to the actual location and how fast you answer. More accurate and quicker guesses earn higher points, and streaks can boost your score even further.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

export default function FAQ() {
  return (
    <section className="relative responsive-container py-12 md:py-16 px-4 bg-radial from-background-light to-background to-70% overflow-hidden">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scaleY: 0.95 }}
          whileInView={{
            opacity: [0, 0.7, 0.4, 0.9, 0.5],
            scaleY: [0.95, 1.02, 0.98, 1.04, 1],
          }}
          transition={{
            duration: 1.1,
            ease: "linear",
          }}
          className="absolute pointer-events-none top-8 -right-[100vw] w-[180vw] aspect-16/1 bg-radial from-primary-600/25 to-transparent to-60%"
        />

        {/* question */}
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative text-2xl md:text-3xl font-semibold text-center mb-12 md:mb-16"
        >
          Frequently Asked Questions
        </motion.h3>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-4 md:gap-6"
        >
          {contents.map((content, index) => (
            <motion.div key={content.question} variants={item}>
              <Accordion title={content.question} defaultOpen={index === 0}>
                {content.answer}
              </Accordion>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
