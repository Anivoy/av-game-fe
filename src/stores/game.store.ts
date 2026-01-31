import { create } from "zustand";
import { persist } from "zustand/middleware";

import type {
  Location,
  GameSession,
  GuessingScene,
  RevealedScene,
  RoundResult,
} from "@/types/game.type";

import { axiosInstance } from "@/utils/axios";

import { AxiosError } from "axios";
import type { ApiResponse, ApiError } from "@/types/api.type";

export interface GameState {
  sessionId: string | null;
  gameModeId: string | null;
  gameMode: string | null;
  currentRound: number;
  totalRounds: number;
  totalScore: number;
  isGameOver: boolean;

  stage: "GUESSING" | "REVEALED";

  guessingScene: GuessingScene | null;
  revealedScene: RevealedScene | null;
  lastRoundResult: RoundResult | null;

  userGuess: Location | null;

  isLoading: boolean;
  isSubmitting: boolean;
  error: string | null;

  loadSession: (sessionId: string) => Promise<boolean>;
  createGame: (mode?: string) => Promise<void>;
  setGuess: (location: Location) => void;
  submitGuess: () => Promise<void>;
  nextRound: () => Promise<void>;
  reset: () => void;
}

const sessionPath = "/game/session";

const getErrorMessage = (
  error: unknown,
  defaultMessage = "An error occurred"
): string => {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiError | undefined;
    return apiError?.message || error.message || defaultMessage;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return defaultMessage;
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      sessionId: null,
      gameModeId: null,
      gameMode: null,
      currentRound: 0,
      totalRounds: 0,
      totalScore: 0,
      isGameOver: false,
      stage: "GUESSING",

      guessingScene: null,
      revealedScene: null,
      lastRoundResult: null,
      userGuess: null,

      isLoading: false,
      isSubmitting: false,
      error: null,

      loadSession: async (sessionId: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.get<ApiResponse<GameSession>>(
            `${sessionPath}/${sessionId}`
          );

          const session = response.data.data!;

          if (!session) {
            throw new Error("Session data not found");
          }

          set({
            sessionId: session.sessionId,
            gameModeId: session.gameModeId,
            gameMode: session.gameMode,
            currentRound: session.currentRound,
            totalRounds: session.totalRounds,
            totalScore: session.totalScore,
            isGameOver: session.isGameOver,
            stage: session.currentRoundState as "GUESSING" | "REVEALED",
            guessingScene: session.guessingScene,
            revealedScene: session.revealedScene,
            lastRoundResult: session.lastRoundResult,
            userGuess: session.lastRoundResult?.guess || null,
            isLoading: false,
          });

          return true;
        } catch (error) {
          set({
            error: getErrorMessage(error, "Failed to load session"),
            isLoading: false,
          });

          return false;
        }
      },

      createGame: async (mode?: string) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axiosInstance.post<ApiResponse<GameSession>>(
            sessionPath,
            { gameMode: mode }
          );

          const session = response.data.data!;

          if (!session) {
            throw new Error("Session data not found");
          }

          set({
            sessionId: session.sessionId,
            gameModeId: session.gameModeId,
            gameMode: session.gameMode,
            currentRound: session.currentRound,
            totalRounds: session.totalRounds,
            totalScore: session.totalScore,
            isGameOver: session.isGameOver,
            stage: "GUESSING",
            guessingScene: session.guessingScene,
            revealedScene: null,
            lastRoundResult: null,
            userGuess: null,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: getErrorMessage(error, "Failed to create game"),
            isLoading: false,
          });
        }
      },

      setGuess: (location: Location) => {
        set({ userGuess: location });
      },

      submitGuess: async () => {
        const { userGuess, sessionId } = get();

        if (!userGuess) {
          set({ error: "Please place a marker on the map" });
          return;
        }

        if (!sessionId) {
          set({ error: "No active game session" });
          return;
        }

        set({ isSubmitting: true, error: null });

        try {
          const submitResponse = await axiosInstance.post<
            ApiResponse<RoundResult>
          >(`${sessionPath}/${sessionId}/guess`, {
            latitude: userGuess.latitude,
            longitude: userGuess.longitude,
          });

          if (!submitResponse.data.data) {
            throw new Error("Failed to submit guess");
          }

          const revealResponse = await axiosInstance.get<
            ApiResponse<GameSession>
          >(`${sessionPath}/${sessionId}/reveal`);

          const session = revealResponse.data.data!;

          if (!session) {
            throw new Error("Session data not found");
          }

          set({
            stage: "REVEALED",
            revealedScene: session.revealedScene,
            lastRoundResult: session.lastRoundResult,
            totalScore: session.totalScore,
            isGameOver: session.isGameOver,
            isSubmitting: false,
          });
        } catch (error) {
          set({
            error: getErrorMessage(error, "Failed to submit guess"),
            isSubmitting: false,
          });
        }
      },

      nextRound: async () => {
        const { sessionId } = get();

        if (!sessionId) {
          set({ error: "No active game session" });
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const response = await axiosInstance.get<ApiResponse<GameSession>>(
            `${sessionPath}/${sessionId}/next`
          );

          const session = response.data.data!;

          if (!session) {
            throw new Error("Session data not found");
          }

          if (session.isGameOver) {
            set({
              isGameOver: true,
              isLoading: false,
            });
            return;
          }

          set({
            currentRound: session.currentRound,
            totalScore: session.totalScore,
            stage: "GUESSING",
            guessingScene: session.guessingScene,
            revealedScene: null,
            lastRoundResult: null,
            userGuess: null,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: getErrorMessage(error, "Failed to move to next round"),
            isLoading: false,
          });
        }
      },

      reset: () => {
        set({
          sessionId: null,
          currentRound: 0,
          totalRounds: 0,
          totalScore: 0,
          isGameOver: false,
          stage: "GUESSING",
          guessingScene: null,
          revealedScene: null,
          lastRoundResult: null,
          userGuess: null,
          isLoading: false,
          isSubmitting: false,
          error: null,
        });
      },
    }),
    {
      name: "game-session-storage",
      partialize: (state) => ({
        sessionId: state.sessionId,
        gameModeId: state.gameModeId,
        gameMode: state.gameMode,
      }),
    }
  )
);
