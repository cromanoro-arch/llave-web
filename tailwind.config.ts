import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#13212f", soft: "#3b4a59", mute: "#64748b" },
        sand: { DEFAULT: "#f7f3ec", deep: "#efe7da" },
        brand: { DEFAULT: "#0f5c58", dark: "#0a4340", light: "#e3f1ef" },
        clay: { DEFAULT: "#c8643b", light: "#fbe9e1" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: { card: "0 1px 2px rgba(19,33,47,.06), 0 8px 24px -12px rgba(19,33,47,.18)" },
    },
  },
  plugins: [],
} satisfies Config;
