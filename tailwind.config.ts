import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: "#EFE9DC", card: "#FBF8F1", dark: "#E2DACB" },
        ink: { DEFAULT: "#111111", soft: "#333333", mute: "#5C5C5C" },
        red: { DEFAULT: "#E11D2A", dark: "#B8141F" },
        yel: { DEFAULT: "#FFD400", tape: "#FFE14D" },
      },
      fontFamily: {
        head: ["var(--font-head)", "Arial Narrow", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
