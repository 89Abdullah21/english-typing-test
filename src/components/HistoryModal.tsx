"use client";

import React from "react";
import { X, Trash2, Trophy, Clock, Target, Calendar } from "lucide-react";
import { TestResult } from "../types/typing";

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: TestResult[];
  onClear: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  onClear,
}) => {
  if (!isOpen) return null;

  const totalTests = history.length;
  const bestWpm = totalTests > 0 ? Math.max(...history.map((h) => h.wpm)) : 0;
  const avgWpm =
    totalTests > 0
      ? Math.round(history.reduce((sum, h) => sum + h.wpm, 0) / totalTests)
      : 0;
  const avgAccuracy =
    totalTests > 0
      ? (
          history.reduce((sum, h) => sum + h.accuracy, 0) / totalTests
        ).toFixed(1)
      : 0;

  function formatTimeAgo(timestamp: number) {
    const diff = Math.floor((Date.now() - timestamp) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-bg-main border border-neutral-800 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-text-main">Test History</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-sub hover:text-text-main hover:bg-bg-sub transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Aggregate Stats Summary */}
        {totalTests > 0 && (
          <div className="grid grid-cols-4 gap-2 p-4 bg-bg-sub/60 border-b border-neutral-800 text-center font-mono">
            <div className="p-2 rounded-lg bg-bg-main/50">
              <span className="text-[10px] uppercase text-text-sub block">Tests</span>
              <span className="text-sm font-bold text-text-main">{totalTests}</span>
            </div>
            <div className="p-2 rounded-lg bg-bg-main/50">
              <span className="text-[10px] uppercase text-text-sub block">Best WPM</span>
              <span className="text-sm font-bold text-primary">{bestWpm}</span>
            </div>
            <div className="p-2 rounded-lg bg-bg-main/50">
              <span className="text-[10px] uppercase text-text-sub block">Avg WPM</span>
              <span className="text-sm font-bold text-text-main">{avgWpm}</span>
            </div>
            <div className="p-2 rounded-lg bg-bg-main/50">
              <span className="text-[10px] uppercase text-text-sub block">Avg Acc</span>
              <span className="text-sm font-bold text-text-main">{avgAccuracy}%</span>
            </div>
          </div>
        )}

        {/* Scrollable Records */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {totalTests === 0 ? (
            <div className="py-12 text-center text-text-sub text-sm">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>No tests recorded yet.</p>
              <p className="text-xs text-neutral-600 mt-1">
                Complete a typing test to track your progress!
              </p>
            </div>
          ) : (
            history.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-bg-sub/50 border border-neutral-800/80 hover:border-neutral-700 transition-colors text-xs font-mono"
              >
                <div className="flex items-center gap-3">
                  <div className="text-primary font-bold text-base w-14">
                    {item.wpm} <span className="text-[10px] text-text-sub">WPM</span>
                  </div>
                  <div className="text-text-sub">
                    <span className="text-text-main font-semibold">{item.accuracy}%</span> acc
                  </div>
                </div>

                <div className="flex items-center gap-4 text-text-sub">
                  <span className="px-2 py-0.5 rounded bg-bg-main border border-neutral-800 text-[10px]">
                    {item.testMode === "time" ? `${item.modeValue}s` : `${item.modeValue}w`}
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    {formatTimeAgo(item.timestamp)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {totalTests > 0 && (
          <div className="flex items-center justify-between p-4 border-t border-neutral-800 bg-bg-sub/40">
            <button
              onClick={onClear}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-error hover:bg-error/10 transition-colors text-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-bg-sub hover:bg-neutral-800 text-text-main text-xs border border-neutral-800"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
