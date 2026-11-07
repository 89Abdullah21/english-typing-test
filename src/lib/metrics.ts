import { calculatePercentile } from "./speedDistribution";

export interface CalculateMetricsParams {
  correctChars: number;
  incorrectChars: number;
  extraChars: number;
  missedChars: number;
  elapsedSeconds: number;
  historyPoints: { second: number; wpm: number; rawWpm: number; errors: number }[];
}

export interface ComputedMetrics {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  consistency: number;
  percentile: number;
}

/**
 * Calculates typing test metrics with high accuracy.
 * Standard typing industry standard: 1 word = 5 characters (including spaces).
 */
export function calculateMetrics({
  correctChars,
  incorrectChars,
  extraChars,
  missedChars,
  elapsedSeconds,
  historyPoints,
}: CalculateMetricsParams): ComputedMetrics {
  const minutes = Math.max(0.001, elapsedSeconds / 60);

  // Net WPM: Based solely on correct characters
  const rawNetWpm = (correctChars / 5) / minutes;
  const wpm = Math.max(0, Math.round(rawNetWpm));

  // Raw WPM: Based on every character typed (correct, incorrect, extra)
  const totalTyped = correctChars + incorrectChars + extraChars;
  const rawGrossWpm = (totalTyped / 5) / minutes;
  const rawWpm = Math.max(0, Math.round(rawGrossWpm));

  // Accuracy Percentage
  const accuracy = totalTyped > 0
    ? Math.max(0, Math.min(100, parseFloat(((correctChars / totalTyped) * 100).toFixed(1))))
    : 100;

  // Consistency Calculation (100 - Coefficient of Variation of per-second WPM)
  let consistency = 100;
  if (historyPoints.length > 2) {
    const wpms = historyPoints.map((p) => p.wpm);
    const mean = wpms.reduce((a, b) => a + b, 0) / wpms.length;
    if (mean > 0) {
      const variance = wpms.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / wpms.length;
      const stdDev = Math.sqrt(variance);
      const cv = (stdDev / mean) * 100;
      consistency = Math.max(0, Math.min(100, Math.round(100 - cv)));
    }
  }

  // Global Percentile (from reverse-engineered distribution model)
  const percentile = calculatePercentile(wpm);

  return {
    wpm,
    rawWpm,
    accuracy,
    consistency,
    percentile,
  };
}
