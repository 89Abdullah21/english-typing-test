export type TestMode = "time" | "words";
export type TimeOption = 15 | 30 | 60 | 120;
export type WordOption = 10 | 25 | 50 | 100;
export type WordListType = "common200" | "expanded1k" | "advanced" | "quotes";

export interface TestConfig {
  mode: TestMode;
  timeLimit: TimeOption;
  wordLimit: WordOption;
  wordList: WordListType;
  soundEnabled: boolean;
}

export type CharStatus = "untouched" | "correct" | "incorrect" | "extra";

export interface CharState {
  char: string;
  status: CharStatus;
}

export interface WordState {
  original: string;
  typed: string;
  isCompleted: boolean;
  hasError: boolean;
}

export interface LiveStats {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  correctChars: number;
  incorrectChars: number;
  extraChars: number;
  missedChars: number;
  elapsedSeconds: number;
  remainingTime: number;
  progressPercent: number;
}

export interface HistoryPoint {
  second: number;
  wpm: number;
  rawWpm: number;
  errors: number;
}

export interface TestResult {
  id: string;
  timestamp: number;
  wpm: number;
  rawWpm: number;
  accuracy: number;
  consistency: number;
  percentile: number;
  duration: number;
  testMode: TestMode;
  modeValue: number;
  wordList: WordListType;
  correctChars: number;
  incorrectChars: number;
  extraChars: number;
  missedChars: number;
  history: HistoryPoint[];
}
