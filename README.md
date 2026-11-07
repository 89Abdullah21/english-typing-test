# TypeShift | Minimalist English Typing Speed Test

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel Ready](https://img.shields.io/badge/Deployment-Vercel_Ready-000000?style=flat-square&logo=vercel)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)

A modern, distraction-free, English-only typing speed test web application inspired by the clean aesthetic of [Monkeytype](https://monkeytype.com/). Built from the ground up using **Next.js 15**, **TypeScript**, and **Tailwind CSS**.

---

## ✨ Features

- **Minimalist Dark Aesthetic**: Designed with an elegant, dark color palette (`#323437` background, `#e2b714` golden primary accent, `#d1d0c5` typed text, `#646669` muted text, `#ca4754` error red).
- **Smooth In-Situ Typing**: Characters change color inline as you type (light gray for correct, red for incorrect, dark red underline for overflow characters).
- **Fluid Floating Caret**: Real-time animated caret smoothly tracks the current character position with sub-pixel precision.
- **Multiple Test Modes**:
  - **Time Modes**: 15s, 30s, 60s, and 120s with live countdown timer.
  - **Word Modes**: 10, 25, 50, and 100 words with live progress indicator.
- **Curated English Word Banks**:
  - **Easy 200**: Top 200 most frequent English words for smooth flow.
  - **Standard 1k**: Comprehensive 1000-word everyday dictionary.
  - **Advanced**: Complex vocabulary with challenging phonetics and digraphs.
  - **Quotes**: Famous quotes from literature, science, and philosophy.
- **Reverse-Engineered Analytics & Percentile**:
  - **Net WPM**: Standard words per minute based on correct keystrokes (`(correctChars / 5) / minutes`).
  - **Raw WPM**: Gross speed factoring all keystrokes.
  - **Accuracy Percentage**: Exact ratio of correct keystrokes to total attempts.
  - **Cadence Consistency**: Standard deviation of instantaneous speed.
  - **Global Percentile Rank**: Integrated cumulative typist distribution model ("Faster than X% of typists").
  - **Interactive Speed Chart**: SVG timeline graph showing WPM and Raw WPM progression over the test duration.
  - **Character Breakdown**: Detailed statistics for Correct, Incorrect, Extra, and Missed characters.
- **Synthesized Mechanical Sound Effects**:
  - Built-in tactile mechanical keyboard switch sound synthesized using the Web Audio API (zero audio file dependencies, toggleable via header).
- **Offline-First Persistence**:
  - Test history, personal best (PB), and configuration preferences are saved locally in `localStorage`.
- **Keyboard Shortcuts**:
  - `Tab + Enter` or `Esc`: Quick test restart.
  - Click-to-focus overlay when clicking away.
- **Production & Vercel Ready**:
  - Static export ready, zero SSR hydration mismatches, zero external backend dependencies.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio**: Web Audio API (Real-time synthesizer)
- **Storage**: Browser LocalStorage

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 20.x, 22.x, or 24.x)
- [npm](https://www.npmjs.com/) (version 10.x or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/89Abdullah21/english-typing-test.git
   cd english-typing-test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the local development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 📦 Production Build

To test the production build locally:

```bash
npm run build
npm run start
```

---

## ☁️ Deploying to Vercel

This application is available on vercel:

1. **Vercel Link**:
   
   [Open TypeShift](https://english-typing-test-gray.vercel.app/)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
