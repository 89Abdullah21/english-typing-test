"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  TestConfig,
  TestResult,
  LiveStats,
  HistoryPoint,
  WordListType,
} from "../types/typing";
import { getRandomWords } from "../lib/wordLists";
import { calculateMetrics } from "../lib/metrics";
import { saveResult } from "../lib/storage";
import { soundEngine } from "../lib/sound";

export function useTypingEngine(initialConfig: TestConfig) {
  const [config, setConfig] = useState<TestConfig>(initialConfig);
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState("");
  const [typedWords, setTypedWords] = useState<string[]>([]);

  const [isTestRunning, setIsTestRunning] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [finalResult, setFinalResult] = useState<TestResult | null>(null);

  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [historyPoints, setHistoryPoints] = useState<HistoryPoint[]>([]);

  // Character counters
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [extraChars, setExtraChars] = useState(0);
  const [missedChars, setMissedChars] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Generate words based on mode
  const initWords = useCallback((cfg: TestConfig) => {
    const count = cfg.mode === "words" ? cfg.wordLimit : 120;
    const generated = getRandomWords(cfg.wordList, count);
    setWords(generated);
    setTypedWords(new Array(generated.length).fill(""));
    setCurrentWordIndex(0);
    setCurrentInput("");
    setIsTestRunning(false);
    setIsTestCompleted(false);
    setFinalResult(null);
    setElapsedSeconds(0);
    setHistoryPoints([]);
    setCorrectChars(0);
    setIncorrectChars(0);
    setExtraChars(0);
    setMissedChars(0);
    startTimeRef.current = null;
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  // Initialize words on config change or mount
  useEffect(() => {
    initWords(config);
  }, [config.mode, config.timeLimit, config.wordLimit, config.wordList, initWords]);

  // Finish test callback
  const finishTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsTestRunning(false);
    setIsTestCompleted(true);

    const actualDuration = startTimeRef.current
      ? (Date.now() - startTimeRef.current) / 1000
      : elapsedSeconds || 1;

    // Calculate final metrics
    const metrics = calculateMetrics({
      correctChars,
      incorrectChars,
      extraChars,
      missedChars,
      elapsedSeconds: actualDuration,
      historyPoints,
    });

    const result: TestResult = {
      id: Date.now().toString(),
      timestamp: Date.now(),
      wpm: metrics.wpm,
      rawWpm: metrics.rawWpm,
      accuracy: metrics.accuracy,
      consistency: metrics.consistency,
      percentile: metrics.percentile,
      duration: Math.round(actualDuration),
      testMode: config.mode,
      modeValue: config.mode === "time" ? config.timeLimit : config.wordLimit,
      wordList: config.wordList,
      correctChars,
      incorrectChars,
      extraChars,
      missedChars,
      history: historyPoints,
    };

    setFinalResult(result);
    saveResult(result);
  }, [
    correctChars,
    incorrectChars,
    extraChars,
    missedChars,
    elapsedSeconds,
    historyPoints,
    config,
  ]);

  // Timer runner
  useEffect(() => {
    if (!isTestRunning) return;

    timerRef.current = setInterval(() => {
      if (!startTimeRef.current) return;
      const now = Date.now();
      const elapsed = (now - startTimeRef.current) / 1000;
      const currentSecond = Math.floor(elapsed);

      setElapsedSeconds(currentSecond);

      // Compute instantaneous metrics for history graphing
      const curMetrics = calculateMetrics({
        correctChars,
        incorrectChars,
        extraChars,
        missedChars,
        elapsedSeconds: elapsed,
        historyPoints,
      });

      setHistoryPoints((prev) => {
        if (prev.some((p) => p.second === currentSecond)) return prev;
        return [
          ...prev,
          {
            second: currentSecond,
            wpm: curMetrics.wpm,
            rawWpm: curMetrics.rawWpm,
            errors: incorrectChars + extraChars,
          },
        ];
      });

      // Check time mode expiry
      if (config.mode === "time" && elapsed >= config.timeLimit) {
        finishTest();
      }
    }, 200);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [
    isTestRunning,
    config.mode,
    config.timeLimit,
    correctChars,
    incorrectChars,
    extraChars,
    missedChars,
    historyPoints,
    finishTest,
  ]);

  // Handle keystrokes
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (isTestCompleted) return;

      // Ignore modifiers
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      // Restart hotkey handled separately (Tab + Enter)
      if (e.key === "Tab") {
        e.preventDefault();
        return;
      }

      // First keystroke: start timer
      if (!isTestRunning && e.key.length === 1) {
        setIsTestRunning(true);
        startTimeRef.current = Date.now();
      }

      const currentExpected = words[currentWordIndex] || "";

      // Space: complete word & advance
      if (e.key === " ") {
        e.preventDefault();
        if (currentInput.trim().length === 0) return; // Don't submit empty spaces

        if (config.soundEnabled) soundEngine.playKeyClick(true, false);

        // Calculate characters for the completed word
        let wordCorrect = 0;
        let wordIncorrect = 0;
        let wordExtra = 0;
        let wordMissed = 0;

        for (let i = 0; i < currentExpected.length; i++) {
          if (i < currentInput.length) {
            if (currentInput[i] === currentExpected[i]) {
              wordCorrect++;
            } else {
              wordIncorrect++;
            }
          } else {
            wordMissed++;
          }
        }

        if (currentInput.length > currentExpected.length) {
          wordExtra += currentInput.length - currentExpected.length;
        }

        // Account for correct space character if word matched
        if (currentInput === currentExpected) {
          wordCorrect++; // standard space bonus
        } else {
          wordIncorrect++;
        }

        setCorrectChars((c) => c + wordCorrect);
        setIncorrectChars((i) => i + wordIncorrect);
        setExtraChars((x) => x + wordExtra);
        setMissedChars((m) => m + wordMissed);

        // Store typed word
        const nextTyped = [...typedWords];
        nextTyped[currentWordIndex] = currentInput;
        setTypedWords(nextTyped);

        // Advance or Finish in word mode
        const nextIndex = currentWordIndex + 1;
        setCurrentWordIndex(nextIndex);
        setCurrentInput("");

        if (config.mode === "words" && nextIndex >= config.wordLimit) {
          finishTest();
        } else if (nextIndex >= words.length - 10) {
          // Dynamically extend word list if running low in time mode
          const moreWords = getRandomWords(config.wordList, 50);
          setWords((prev) => [...prev, ...moreWords]);
          setTypedWords((prev) => [...prev, ...new Array(50).fill("")]);
        }
        return;
      }

      // Backspace
      if (e.key === "Backspace") {
        if (config.soundEnabled) soundEngine.playKeyClick(false, false);

        if (currentInput.length > 0) {
          setCurrentInput((prev) => prev.slice(0, -1));
        } else if (currentWordIndex > 0) {
          // Monkeytype cross-word backspace if previous word had errors
          const prevIndex = currentWordIndex - 1;
          const prevExpected = words[prevIndex];
          const prevTyped = typedWords[prevIndex];

          if (prevTyped && prevTyped !== prevExpected) {
            e.preventDefault();
            setCurrentWordIndex(prevIndex);
            setCurrentInput(prevTyped);

            // Revert characters for previous word
            let revCorrect = 0;
            let revIncorrect = 0;
            let revExtra = 0;
            let revMissed = 0;

            for (let i = 0; i < prevExpected.length; i++) {
              if (i < prevTyped.length) {
                if (prevTyped[i] === prevExpected[i]) revCorrect++;
                else revIncorrect++;
              } else {
                revMissed++;
              }
            }
            if (prevTyped.length > prevExpected.length) {
              revExtra += prevTyped.length - prevExpected.length;
            }
            revIncorrect++; // Space character

            setCorrectChars((c) => Math.max(0, c - revCorrect));
            setIncorrectChars((i) => Math.max(0, i - revIncorrect));
            setExtraChars((x) => Math.max(0, x - revExtra));
            setMissedChars((m) => Math.max(0, m - revMissed));
          }
        }
        return;
      }

      // Printable single character
      if (e.key.length === 1) {
        // Enforce max extra character limit per word
        if (currentInput.length >= currentExpected.length + 10) {
          return;
        }

        const isCharCorrect =
          currentInput.length < currentExpected.length &&
          e.key === currentExpected[currentInput.length];

        if (config.soundEnabled) {
          soundEngine.playKeyClick(false, !isCharCorrect);
        }

        setCurrentInput((prev) => prev + e.key);
      }
    },
    [
      isTestCompleted,
      isTestRunning,
      words,
      currentWordIndex,
      currentInput,
      typedWords,
      config,
      finishTest,
    ]
  );

  // Compute live stats for UI display
  const metrics = calculateMetrics({
    correctChars,
    incorrectChars,
    extraChars,
    missedChars,
    elapsedSeconds: Math.max(0.001, elapsedSeconds),
    historyPoints,
  });

  const remainingTime =
    config.mode === "time"
      ? Math.max(0, config.timeLimit - elapsedSeconds)
      : elapsedSeconds;

  const progressPercent =
    config.mode === "time"
      ? Math.min(100, (elapsedSeconds / config.timeLimit) * 100)
      : Math.min(100, (currentWordIndex / config.wordLimit) * 100);

  const liveStats: LiveStats = {
    wpm: metrics.wpm,
    rawWpm: metrics.rawWpm,
    accuracy: metrics.accuracy,
    correctChars,
    incorrectChars,
    extraChars,
    missedChars,
    elapsedSeconds,
    remainingTime,
    progressPercent,
  };

  const restartTest = useCallback(() => {
    initWords(config);
  }, [config, initWords]);

  const updateConfig = useCallback((newConfig: Partial<TestConfig>) => {
    setConfig((prev) => {
      const merged = { ...prev, ...newConfig };
      return merged;
    });
  }, []);

  return {
    config,
    updateConfig,
    words,
    currentWordIndex,
    currentInput,
    typedWords,
    isTestRunning,
    isTestCompleted,
    finalResult,
    liveStats,
    handleKeyDown,
    restartTest,
  };
}
