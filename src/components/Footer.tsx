"use client";

import React from "react";
import { Github, Triangle } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-5xl mx-auto py-8 px-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-800/80 text-xs text-text-sub font-mono select-none">
      {/* Keyboard Shortcuts Hint */}
      <div className="flex items-center gap-4 text-[11px]">
        <div className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 rounded bg-bg-sub border border-neutral-800 text-text-main text-[10px]">
            tab
          </kbd>
          <span>+</span>
          <kbd className="px-1.5 py-0.5 rounded bg-bg-sub border border-neutral-800 text-text-main text-[10px]">
            enter
          </kbd>
          <span>- restart test</span>
        </div>

        <div className="flex items-center gap-1.5 hidden sm:flex">
          <kbd className="px-1.5 py-0.5 rounded bg-bg-sub border border-neutral-800 text-text-main text-[10px]">
            esc
          </kbd>
          <span>- reset</span>
        </div>
      </div>

      {/* Links & Vercel Readiness Badge */}
      <div className="flex items-center gap-4 text-xs font-sans">
        <a
          href="https://github.com/89Abdullah21/english-typing-test"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 hover:text-text-main transition-colors"
        >
          <Github className="w-4 h-4" />
          <span>GitHub</span>
        </a>

        <div className="flex items-center gap-1.5 text-neutral-500">
          <Triangle className="w-3.5 h-3.5 fill-current" />
          <span>Vercel Ready</span>
        </div>
      </div>
    </footer>
  );
};
