export interface Location {
  latitude: number;
  longitude: number;
}

export type Difficulty = {
  name: string;
  colorCode: string;
};

export interface SceneLocation {
  city: string;
  prefecture: string;
  region: string;
}

export interface GuessingScene {
  id: string;
  snippet: string;
}

export interface RevealedScene {
  id: string;
  name: string;
  description: string;
  showTitle: string;
  location: SceneLocation;
  latitude: number;
  longitude: number;
  snippet: string;
  reference: string;
  difficulty: Difficulty;
}

export interface RoundResult {
  score: number;
  distance: number;
  timeSpent: number;
  guess: Location;
}

export interface GameSession {
  sessionId: string;
  gameModeId: string;
  gameMode: string;
  status: string;
  currentRound: number;
  currentRoundState: "GUESSING" | "REVEALED";
  totalRounds: number;
  totalScore: number;
  isGameOver: boolean;
  guessingScene: GuessingScene | null;
  revealedScene: RevealedScene | null;
  lastRoundResult: RoundResult | null;
}
