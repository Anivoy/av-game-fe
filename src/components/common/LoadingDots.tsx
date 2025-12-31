import { motion } from "framer-motion";

export function LoadingDots() {
  return (
    <motion.span className="inline-flex w-[1.25em] overflow-hidden" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        >
          .
        </motion.span>
      ))}
    </motion.span>
  );
}
