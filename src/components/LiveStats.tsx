"use client";

import React from "react";
import { LiveStats as LiveStatsType, TestMode } from "../types/typing";

interface LiveStatsProps {
  stats: LiveStatsType;
  mode: TestMode;
  isTestRunning: boolean;
}

export const LiveStats: React.FC<LiveStatsProps> = ({
  stats,
  mode,
  isTestRunning,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto flex items-center justify-between px-2 text-primary font-mono select-none">
      {/* Primary Counter: Big Countdown or Word Counter */}
      <div className="text-3xl font-bold tracking-tight">
        {mode === "time" ? (
          <span>{stats.remainingTime}</span>
        ) : (
          <span>
            {stats.remainingTime}
          </span>
        )}
      </div>

      {/* Secondary Live Feedback (visible once typing starts) */}
      <div
        className={`flex items-center gap-6 text-sm font-semibold transition-opacity duration-300 ${
          isTestRunning ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-text-sub text-xs uppercase">wpm</span>
          <span className="text-text-main text-base">{stats.wpm}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-text-sub text-xs uppercase">acc</span>
          <span className="text-text-main text-base">{stats.accuracy}%</span>
        </div>
      </div>
    </div>
  );
};
