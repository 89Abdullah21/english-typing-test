"use client";

import React from "react";
import { Clock, AlignLeft, BookOpen } from "lucide-react";
import {
  TestConfig,
  TestMode,
  TimeOption,
  WordOption,
  WordListType,
} from "../types/typing";

interface TestConfigBarProps {
  config: TestConfig;
  onChange: (update: Partial<TestConfig>) => void;
  disabled: boolean;
}

export const TestConfigBar: React.FC<TestConfigBarProps> = ({
  config,
  onChange,
  disabled,
}) => {
  const timeOptions: TimeOption[] = [15, 30, 60, 120];
  const wordOptions: WordOption[] = [10, 25, 50, 100];

  const wordLists: { id: WordListType; label: string }[] = [
    { id: "common200", label: "easy 200" },
    { id: "expanded1k", label: "standard 1k" },
    { id: "advanced", label: "advanced" },
    { id: "quotes", label: "quotes" },
  ];

  return (
    <div
      className={`w-full max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-4 py-3 px-4 rounded-xl bg-bg-sub/80 border border-neutral-800/60 text-xs transition-opacity duration-200 select-none ${
        disabled ? "opacity-30 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Test Mode */}
      <div className="flex items-center gap-1 bg-bg-main px-2 py-1 rounded-lg border border-neutral-800">
        <button
          onClick={() => onChange({ mode: "time" })}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
            config.mode === "time"
              ? "text-primary font-bold"
              : "text-text-sub hover:text-text-main"
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>time</span>
        </button>

        <button
          onClick={() => onChange({ mode: "words" })}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors ${
            config.mode === "words"
              ? "text-primary font-bold"
              : "text-text-sub hover:text-text-main"
          }`}
        >
          <AlignLeft className="w-3.5 h-3.5" />
          <span>words</span>
        </button>
      </div>

      <div className="w-[1px] h-4 bg-neutral-800 hidden sm:block" />

      {/* Options based on mode */}
      <div className="flex items-center gap-1 bg-bg-main px-2 py-1 rounded-lg border border-neutral-800">
        {config.mode === "time"
          ? timeOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => onChange({ timeLimit: opt })}
                className={`px-2 py-1 rounded transition-colors ${
                  config.timeLimit === opt
                    ? "text-primary font-bold"
                    : "text-text-sub hover:text-text-main"
                }`}
              >
                {opt}s
              </button>
            ))
          : wordOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => onChange({ wordLimit: opt })}
                className={`px-2 py-1 rounded transition-colors ${
                  config.wordLimit === opt
                    ? "text-primary font-bold"
                    : "text-text-sub hover:text-text-main"
                }`}
              >
                {opt}
              </button>
            ))}
      </div>

      <div className="w-[1px] h-4 bg-neutral-800 hidden sm:block" />

      {/* Word Pool Selector */}
      <div className="flex items-center gap-1 bg-bg-main px-2 py-1 rounded-lg border border-neutral-800">
        <div className="text-text-sub pl-1 pr-1 flex items-center">
          <BookOpen className="w-3.5 h-3.5" />
        </div>
        {wordLists.map((list) => (
          <button
            key={list.id}
            onClick={() => onChange({ wordList: list.id })}
            className={`px-2 py-1 rounded transition-colors ${
              config.wordList === list.id
                ? "text-primary font-bold"
                : "text-text-sub hover:text-text-main"
            }`}
          >
            {list.label}
          </button>
        ))}
      </div>
    </div>
  );
};
