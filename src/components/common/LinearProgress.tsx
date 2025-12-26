import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LinearProgressProps {
  loading: boolean;
}

export default function LinearProgress({ loading }: LinearProgressProps) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (loading) {
      // Start progress
      setProgress(10);

      intervalRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev < 30) return prev + Math.random() * 10;
          if (prev < 60) return prev + Math.random() * 4;
          if (prev < 85) return prev + Math.random() * 1.5;
          return prev;
        });
      }, 300);
    } else {
      // Finish progress
      setProgress(100);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-0 left-0 right-0 z-9999"
        >
          <div className="h-1 bg-transparent">
            <motion.div
              className="h-full bg-primary-600"
              animate={{ width: `${progress}%` }}
              transition={{
                ease: "easeOut",
                duration: 0.3,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
