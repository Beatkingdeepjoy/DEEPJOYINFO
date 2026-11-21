import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-hover": "var(--surface-hover)",
        border: "var(--border)",
        accent: {
          violet: "#7C3AED",
          cyan: "#22D3EE",
          magenta: "#E879F9",
          emerald: "#10B981",
        },
        night: {
          950: "#05050A",
          900: "#0B0B14",
          850: "#10101F",
          800: "#17172C",
        },
        tripura: {
          forest: "#071512",
          hills: "#0C1D18",
          tea: "#112C24",
        },
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        glass: "20px",
        card: "24px",
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(124, 58, 237, 0.35)",
        "glow-cyan": "0 0 25px -5px rgba(34, 211, 238, 0.35)",
        "glow-magenta": "0 0 25px -5px rgba(232, 121, 249, 0.35)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        ticker: "ticker 35s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        ticker: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
