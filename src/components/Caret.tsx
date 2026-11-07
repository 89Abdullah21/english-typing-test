"use client";

import React from "react";

interface CaretProps {
  left: number;
  top: number;
  visible: boolean;
}

export const Caret: React.FC<CaretProps> = ({ left, top, visible }) => {
  if (!visible) return null;

  return (
    <span
      className="absolute w-[2.5px] h-[1.5em] bg-primary rounded-sm pointer-events-none transition-all duration-75 ease-out animate-pulse"
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
    />
  );
};
