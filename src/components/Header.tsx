"use client";

import React from "react";
import { Keyboard, History, Volume2, VolumeX, Sparkles } from "lucide-react";

interface HeaderProps {
  onOpenHistory: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  personalBest: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHistory,
  soundEnabled,
  onToggleSound,
  personalBest,
}) => {
  return (
    <header className="w-full max-w-5xl mx-auto flex items-center justify-between py-6 px-4">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3 group cursor-default">
        <div className="p-2 rounded-lg bg-bg-sub border border-neutral-800 text-primary group-hover:border-primary/40 transition-colors">
          <Keyboard className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-text-main">
              Type<span className="text-primary">Shift</span>
            </h1>
            <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-bg-sub border border-neutral-800 text-text-sub">
              English
            </span>
          </div>
          <p className="text-xs text-text-sub hidden sm:block">
            Minimalist, distraction-free typing speed test
          </p>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        {personalBest > 0 && (
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-sub border border-neutral-800/80 text-xs text-text-sub"
            title="Personal Best WPM"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>PB:</span>
            <span className="text-text-main font-bold">{personalBest} WPM</span>
          </div>
        )}

        {/* Audio Toggle */}
        <button
          onClick={onToggleSound}
          className={`p-2 rounded-lg border transition-all text-xs flex items-center gap-1.5 ${
            soundEnabled
              ? "bg-bg-sub border-primary/50 text-primary"
              : "bg-bg-sub border-neutral-800 text-text-sub hover:text-text-main"
          }`}
          title={soundEnabled ? "Mute typing sound" : "Enable mechanical switch sound"}
          aria-label="Toggle sound"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </button>

        {/* History Modal Trigger */}
        <button
          onClick={onOpenHistory}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-sub border border-neutral-800 text-text-sub hover:text-text-main hover:border-neutral-700 transition-colors text-xs"
          title="View Test History"
        >
          <History className="w-4 h-4" />
          <span className="hidden sm:inline">History</span>
        </button>
      </div>
    </header>
  );
};
