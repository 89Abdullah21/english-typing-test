"use client";

import React from "react";
import {
  RotateCcw,
  Trophy,
  Activity,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Zap,
} from "lucide-react";
import { TestResult } from "../types/typing";

interface ResultsModalProps {
  result: TestResult;
  onRestart: () => void;
  onOpenHistory: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  result,
  onRestart,
  onOpenHistory,
}) => {
  // SVG Chart points calculation
  const history = result.history || [];
  const maxWpm = Math.max(10, ...history.map((h) => Math.max(h.wpm, h.rawWpm)), result.rawWpm, result.wpm);
  const chartHeight = 120;
  const chartWidth = 600;

  const pointsWpm = history.map((pt, idx) => {
    const x = history.length > 1 ? (idx / (history.length - 1)) * chartWidth : chartWidth / 2;
    const y = chartHeight - (pt.wpm / maxWpm) * (chartHeight - 20) - 10;
    return `${x},${y}`;
  }).join(" ");

  const pointsRaw = history.map((pt, idx) => {
    const x = history.length > 1 ? (idx / (history.length - 1)) * chartWidth : chartWidth / 2;
    const y = chartHeight - (pt.rawWpm / maxWpm) * (chartHeight - 20) - 10;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center overflow-y-auto bg-bg-main/55 px-4 py-6 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full max-w-4xl max-h-[calc(100vh-3rem)] overflow-y-auto rounded-3xl border border-white/10 bg-white/[0.07] p-4 shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-8">
        {/* Top Banner / Percentile */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 text-primary">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-main">Test Complete</h2>
            <p className="text-xs text-text-sub">
              {result.testMode === "time" ? `${result.modeValue}s test` : `${result.modeValue} words test`} • {result.wordList}
            </p>
          </div>
        </div>

        {/* Global Percentile Rank badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-bg-sub border border-neutral-800">
          <Zap className="w-4 h-4 text-primary" />
          <div className="text-xs">
            <span className="text-text-sub">Global Percentile: </span>
            <span className="font-bold text-primary">{result.percentile}%</span>
            <span className="text-text-sub text-[11px] ml-1">
              (faster than {result.percentile}% of typists)
            </span>
          </div>
        </div>
      </div>

      {/* Primary Highlights Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
        {/* Net WPM */}
        <div className="p-5 rounded-2xl bg-bg-sub/90 border border-neutral-800/80">
          <span className="text-xs uppercase font-mono tracking-wider text-text-sub">
            wpm
          </span>
          <div className="text-5xl font-extrabold font-mono text-primary mt-1">
            {result.wpm}
          </div>
          <span className="text-[11px] text-text-sub mt-1 block">Net words/min</span>
        </div>

        {/* Accuracy */}
        <div className="p-5 rounded-2xl bg-bg-sub/90 border border-neutral-800/80">
          <span className="text-xs uppercase font-mono tracking-wider text-text-sub">
            acc
          </span>
          <div className="text-5xl font-extrabold font-mono text-text-main mt-1">
            {result.accuracy}%
          </div>
          <span className="text-[11px] text-text-sub mt-1 block">Correct ratio</span>
        </div>

        {/* Raw WPM */}
        <div className="p-5 rounded-2xl bg-bg-sub/90 border border-neutral-800/80">
          <span className="text-xs uppercase font-mono tracking-wider text-text-sub">
            raw wpm
          </span>
          <div className="text-4xl font-bold font-mono text-text-sub mt-2">
            {result.rawWpm}
          </div>
          <span className="text-[11px] text-text-sub mt-1 block">Gross keystrokes</span>
        </div>

        {/* Consistency */}
        <div className="p-5 rounded-2xl bg-bg-sub/90 border border-neutral-800/80">
          <span className="text-xs uppercase font-mono tracking-wider text-text-sub">
            consistency
          </span>
          <div className="text-4xl font-bold font-mono text-text-sub mt-2">
            {result.consistency}%
          </div>
          <span className="text-[11px] text-text-sub mt-1 block">Cadence stability</span>
        </div>
      </div>

      {/* Speed Graph (WPM over time) */}
      {history.length > 1 && (
        <div className="my-4 p-5 rounded-2xl bg-bg-sub/50 border border-neutral-800/80">
          <div className="flex items-center justify-between text-xs text-text-sub mb-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                <span>WPM</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-text-sub" />
                <span>Raw WPM</span>
              </span>
            </div>
            <span>Duration: {result.duration}s</span>
          </div>

          <div className="w-full overflow-hidden">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-[120px] overflow-visible"
            >
              {/* Grid lines */}
              <line
                x1="0"
                y1={chartHeight - 10}
                x2={chartWidth}
                y2={chartHeight - 10}
                stroke="#3f4246"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <line
                x1="0"
                y1={chartHeight / 2}
                x2={chartWidth}
                y2={chartHeight / 2}
                stroke="#3f4246"
                strokeWidth="1"
                strokeDasharray="4 4"
              />

              {/* Raw WPM Line */}
              <polyline
                fill="none"
                stroke="#646669"
                strokeWidth="2"
                points={pointsRaw}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Net WPM Line */}
              <polyline
                fill="none"
                stroke="#e2b714"
                strokeWidth="3"
                points={pointsWpm}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Detailed Character Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-xs font-mono">
        <div className="flex items-center gap-2 p-3 rounded-xl bg-bg-sub/60 border border-neutral-800">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <div>
            <div className="text-text-sub text-[10px]">CORRECT</div>
            <div className="text-text-main font-bold">{result.correctChars} chars</div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-xl bg-bg-sub/60 border border-neutral-800">
          <XCircle className="w-4 h-4 text-error" />
          <div>
            <div className="text-text-sub text-[10px]">INCORRECT</div>
            <div className="text-text-main font-bold">{result.incorrectChars} chars</div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-xl bg-bg-sub/60 border border-neutral-800">
          <Activity className="w-4 h-4 text-amber-500" />
          <div>
            <div className="text-text-sub text-[10px]">EXTRA</div>
            <div className="text-text-main font-bold">{result.extraChars} chars</div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-xl bg-bg-sub/60 border border-neutral-800">
          <HelpCircle className="w-4 h-4 text-neutral-500" />
          <div>
            <div className="text-text-sub text-[10px]">MISSED</div>
            <div className="text-text-main font-bold">{result.missedChars} chars</div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4 pt-6">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-hover text-bg-main font-semibold text-sm transition-all shadow-lg shadow-primary/10 group"
          autoFocus
        >
          <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
          <span>Next Test</span>
          <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-bg-main/20 text-bg-main">
            tab + enter
          </kbd>
        </button>

        <button
          onClick={onOpenHistory}
          className="px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/10 text-text-sub hover:text-text-main border border-white/10 text-sm font-medium transition-colors"
        >
          View History
        </button>
      </div>
      </div>
    </div>
  );
};
