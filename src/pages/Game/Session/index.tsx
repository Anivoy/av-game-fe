import { useGameStore } from "@/stores/game.store";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import GuessingPage from "./Guessing";
import { motion, AnimatePresence } from "framer-motion";
import RevealPage from "./Revealing";

export default function GameSession() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const modeId = searchParams.get("mode");
  const {
    stage,
    sessionId,
    gameModeId,
    guessingScene,
    revealedScene,
    isLoading,
    error,
    createGame,
    loadSession,
    reset,
  } = useGameStore();

  useEffect(() => {
    const initGame = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (sessionId) {
        if (modeId && gameModeId !== modeId) {
          reset();
          await createGame(modeId ?? undefined);
        }
        const ok = await loadSession(sessionId);
        if (!ok) {
          reset();
          await createGame(modeId ?? undefined);
        }
      } else {
        await createGame(modeId ?? undefined);
      }
    };

    initGame();
  }, []);

  useEffect(() => {
    if (sessionId && modeId) {
      navigate("/play", { replace: true });
    }
  }, [sessionId, modeId]);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence mode="wait">
      {error && (
        <motion.div
          key="error"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25 }}
        >
          <ErrorPage message={error} />
        </motion.div>
      )}

      {(isLoading || !sessionId || (stage === "GUESSING" && !guessingScene)) &&
        !error && (
          <motion.div
            key="loading"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <LoadingPage />
          </motion.div>
        )}

      {!isLoading && sessionId && stage === "GUESSING" && guessingScene && (
        <motion.div
          key="guessing"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25 }}
        >
          <GuessingPage />
        </motion.div>
      )}

      {!isLoading && sessionId && stage === "REVEALED" && revealedScene && (
        <motion.div
          key="revealing"
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25 }}
        >
          <RevealPage />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
