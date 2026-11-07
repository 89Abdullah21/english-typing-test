import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          main: "#323437",
          sub: "#2c2e31",
          alt: "#242628",
        },
        primary: {
          DEFAULT: "#e2b714",
          hover: "#d1a70e",
        },
        text: {
          main: "#d1d0c5",
          sub: "#646669",
        },
        error: {
          DEFAULT: "#ca4754",
          extra: "#7e2a33",
        },
      },
      fontFamily: {
        mono: [
          "'Roboto Mono'",
          "'JetBrains Mono'",
          "'Fira Code'",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
