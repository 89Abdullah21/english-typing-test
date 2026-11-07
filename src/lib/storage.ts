import { TestConfig, TestResult } from "../types/typing";

const HISTORY_KEY = "typing_test_history";
const CONFIG_KEY = "typing_test_config";
const MAX_HISTORY = 50;

export const DEFAULT_CONFIG: TestConfig = {
  mode: "time",
  timeLimit: 30,
  wordLimit: 25,
  wordList: "common200",
  soundEnabled: false,
};

export function loadConfig(): TestConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const stored = localStorage.getItem(CONFIG_KEY);
    if (!stored) return DEFAULT_CONFIG;
    return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export function saveConfig(config: TestConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error("Failed to save config to localStorage", e);
  }
}

export function loadHistory(): TestResult[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveResult(result: TestResult): TestResult[] {
  if (typeof window === "undefined") return [result];
  try {
    const history = loadHistory();
    const updated = [result, ...history].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to save result to localStorage", e);
    return [result];
  }
}

export function clearHistory(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error("Failed to clear history", e);
  }
}

export function getPersonalBest(history: TestResult[]): number {
  if (history.length === 0) return 0;
  return Math.max(...history.map((h) => h.wpm));
}
