"use client";

import React, { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { TestConfigBar } from "../components/TestConfigBar";
import { LiveStats } from "../components/LiveStats";
import { TypingArea } from "../components/TypingArea";
import { ResultsModal } from "../components/ResultsModal";
import { HistoryModal } from "../components/HistoryModal";
import { Footer } from "../components/Footer";
import { useTypingEngine } from "../hooks/useTypingEngine";
import {
  loadConfig,
  saveConfig,
  loadHistory,
  clearHistory,
  getPersonalBest,
} from "../lib/storage";
import { TestConfig, TestResult } from "../types/typing";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState<TestResult[]>([]);

  // Initialize typing engine with stored or default config
  const {
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
  } = useTypingEngine(loadConfig());

  // Client-side hydration initialization
  useEffect(() => {
    setMounted(true);
    setHistory(loadHistory());
  }, []);

  // Update history when a new test finishes
  useEffect(() => {
    if (isTestCompleted && finalResult) {
      setHistory(loadHistory());
    }
  }, [isTestCompleted, finalResult]);

  // Persist config updates
  const handleConfigChange = (update: Partial<TestConfig>) => {
    updateConfig(update);
    const updated = { ...config, ...update };
    saveConfig(updated);
  };

  const handleToggleSound = () => {
    handleConfigChange({ soundEnabled: !config.soundEnabled });
  };

  const handleClearHistory = () => {
    clearHistory();
    setHistory([]);
  };

  // Keyboard shortcut listener for Tab + Enter restart
  useEffect(() => {
    let tabPressed = false;

    const handleKeyDownGlobal = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        tabPressed = true;
      }
      if (e.key === "Enter" && tabPressed) {
        e.preventDefault();
        restartTest();
        tabPressed = false;
      }
    };

    const handleKeyUpGlobal = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        tabPressed = false;
      }
    };

    window.addEventListener("keydown", handleKeyDownGlobal);
    window.addEventListener("keyup", handleKeyUpGlobal);
    return () => {
      window.removeEventListener("keydown", handleKeyDownGlobal);
      window.removeEventListener("keyup", handleKeyUpGlobal);
    };
  }, [restartTest]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-bg-main flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const pb = getPersonalBest(history);

  return (
    <div className="flex flex-col justify-between min-h-screen py-2">
      {/* Top Navigation */}
      <Header
        onOpenHistory={() => setIsHistoryOpen(true)}
        soundEnabled={config.soundEnabled}
        onToggleSound={handleToggleSound}
        personalBest={pb}
      />

      {/* Main Interactive Stage */}
      <main className="flex-1 flex flex-col items-center justify-center w-full px-4 my-auto">
        {!isTestCompleted ? (
          <div className="w-full max-w-4xl flex flex-col gap-8">
            {/* Mode & Word List Configuration */}
            <TestConfigBar
              config={config}
              onChange={handleConfigChange}
              disabled={isTestRunning}
            />

            {/* Countdown / Live Metrics */}
            <LiveStats
              stats={liveStats}
              mode={config.mode}
              isTestRunning={isTestRunning}
            />

            {/* In-situ Words & Floating Caret Canvas */}
            <TypingArea
              words={words}
              currentWordIndex={currentWordIndex}
              currentInput={currentInput}
              typedWords={typedWords}
              onKeyDown={handleKeyDown}
              onRestart={restartTest}
              isTestCompleted={isTestCompleted}
            />
          </div>
        ) : (
          finalResult && (
            <ResultsModal
              result={finalResult}
              onRestart={restartTest}
              onOpenHistory={() => setIsHistoryOpen(true)}
            />
          )
        )}
      </main>

      {/* History Slideout / Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onClear={handleClearHistory}
      />

      {/* Footer Navigation */}
      <Footer />
    </div>
  );
}
