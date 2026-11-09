"use client";

import React, { useRef, useEffect, useState, useLayoutEffect } from "react";
import { RotateCcw, MousePointer } from "lucide-react";
import { Caret } from "./Caret";

interface TypingAreaProps {
  words: string[];
  currentWordIndex: number;
  currentInput: string;
  typedWords: string[];
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onRestart: () => void;
  isTestCompleted: boolean;
}

export const TypingArea: React.FC<TypingAreaProps> = ({
  words,
  currentWordIndex,
  currentInput,
  typedWords,
  onKeyDown,
  onRestart,
  isTestCompleted,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeWordRef = useRef<HTMLSpanElement>(null);
  const activeCharRef = useRef<HTMLSpanElement>(null);

  const [isFocused, setIsFocused] = useState(true);
  const [caretPos, setCaretPos] = useState({ left: 0, top: 0, visible: false });

  // Always keep input focused
  useEffect(() => {
    if (!isTestCompleted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isTestCompleted, currentWordIndex]);

  // Global keydown for restart (Tab + Enter or Escape)
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onRestart();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, [onRestart]);

  // Update Caret coordinates
  useLayoutEffect(() => {
    if (!containerRef.current || isTestCompleted) {
      setCaretPos((prev) => ({ ...prev, visible: false }));
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();

    if (activeCharRef.current) {
      const charRect = activeCharRef.current.getBoundingClientRect();
      setCaretPos({
        left: charRect.left - containerRect.left,
        top: charRect.top - containerRect.top + containerRef.current.scrollTop,
        visible: isFocused,
      });
    } else if (activeWordRef.current) {
      // Past the last character of the word
      const wordRect = activeWordRef.current.getBoundingClientRect();
      const lastChild = activeWordRef.current.lastElementChild;
      if (lastChild) {
        const lastChildRect = lastChild.getBoundingClientRect();
        setCaretPos({
          left: lastChildRect.right - containerRect.left,
          top: lastChildRect.top - containerRect.top + containerRef.current.scrollTop,
          visible: isFocused,
        });
      } else {
        setCaretPos({
          left: wordRect.left - containerRect.left,
          top: wordRect.top - containerRect.top + containerRef.current.scrollTop,
          visible: isFocused,
        });
      }
    }
  }, [currentWordIndex, currentInput, isFocused, isTestCompleted, words]);

  // Smooth scroll container to follow active word
  useEffect(() => {
    if (activeWordRef.current && containerRef.current) {
      const container = containerRef.current;
      const word = activeWordRef.current;
      const wordTop = word.offsetTop;
      const containerScroll = container.scrollTop;
      const relativeTop = wordTop - containerScroll;

      // When word drops below the 2nd line, scroll smoothly
      if (relativeTop > 70) {
        container.scrollTo({
          top: wordTop - 35,
          behavior: "smooth",
        });
      } else if (relativeTop < 0) {
        container.scrollTo({
          top: wordTop,
          behavior: "smooth",
        });
      }
    }
  }, [currentWordIndex]);

  if (isTestCompleted) return null;

  return (
    <div className="w-full max-w-4xl mx-auto relative select-none">
      {/* Hidden input to capture physical keyboard input */}
      <input
        ref={inputRef}
        type="text"
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        value={currentInput}
        onChange={() => {}}
        onKeyDown={onKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoFocus
        tabIndex={0}
      />

      {/* Main Typing Canvas */}
      <div
        ref={containerRef}
        onClick={() => inputRef.current?.focus()}
        className={`relative h-[140px] overflow-hidden text-2xl font-mono leading-relaxed tracking-wide cursor-text transition-all duration-300 py-2 px-1 ${
          !isFocused ? "blur-[2px] opacity-40" : "blur-0 opacity-100"
        }`}
      >
        <Caret
          left={caretPos.left}
          top={caretPos.top}
          visible={caretPos.visible && isFocused}
        />

        <div className="flex flex-wrap gap-x-3 gap-y-2">
          {words.map((word, wordIdx) => {
            const isCurrent = wordIdx === currentWordIndex;
            const isTyped = wordIdx < currentWordIndex;
            const typedVal = isTyped ? typedWords[wordIdx] || "" : isCurrent ? currentInput : "";

            return (
              <span
                key={wordIdx}
                ref={isCurrent ? activeWordRef : null}
                className={`inline-block relative rounded px-0.5 transition-colors ${
                  isTyped && typedVal !== word ? "border-b border-error/40" : ""
                }`}
              >
                {/* Expected word characters */}
                {word.split("").map((char, charIdx) => {
                  const isCharActive = isCurrent && charIdx === currentInput.length;
                  let colorClass = "text-text-sub"; // Default untyped

                  if (isCurrent) {
                    if (charIdx < currentInput.length) {
                      colorClass =
                        currentInput[charIdx] === char
                          ? "text-text-main"
                          : "text-error";
                    }
                  } else if (isTyped) {
                    if (charIdx < typedVal.length) {
                      colorClass =
                        typedVal[charIdx] === char
                          ? "text-text-main"
                          : "text-error";
                    } else {
                      colorClass = "text-error/60"; // missed character
                    }
                  }

                  return (
                    <span
                      key={charIdx}
                      ref={isCharActive ? activeCharRef : null}
                      className={`${colorClass} transition-colors duration-75`}
                    >
                      {char}
                    </span>
                  );
                })}

                {/* Extra typed characters beyond word length */}
                {typedVal.length > word.length &&
                  typedVal
                    .slice(word.length)
                    .split("")
                    .map((extraChar, extraIdx) => (
                      <span
                        key={`extra-${extraIdx}`}
                        className="text-error-extra underline decoration-error/70"
                      >
                        {extraChar}
                      </span>
                    ))}
              </span>
            );
          })}
        </div>
      </div>

      {/* Focus Overlay Notice */}
      {!isFocused && (
        <div
          onClick={() => inputRef.current?.focus()}
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-bg-sub/90 border border-neutral-700/80 shadow-xl text-primary text-sm font-sans font-medium">
            <MousePointer className="w-4 h-4 animate-bounce" />
            <span>Click to focus and start typing</span>
          </div>
        </div>
      )}

      {/* Restart Button Bar */}
      <div className="flex items-center justify-center mt-6">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-text-sub hover:text-text-main hover:bg-bg-sub/80 border border-transparent hover:border-neutral-800 transition-all text-xs font-mono group"
          title="Restart Test (Esc or Tab + Enter)"
        >
          <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
          <span>restart test</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] rounded bg-bg-sub border border-neutral-800 text-text-sub">
            esc
          </kbd>
        </button>
      </div>
    </div>
  );
};
