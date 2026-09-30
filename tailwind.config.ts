import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F3E8",
        surface: "#FFFDF8",
        primary: {
          DEFAULT: "#1F4D3A",
          hover: "#173B2C",
        },
        moss: {
          DEFAULT: "#8FB573",
          light: "#A4C78B",
          dark: "#749B5B",
        },
        "soft-tint": "#E6EEDC",
        accent: {
          DEFAULT: "#D9A441",
          hover: "#C59232",
        },
        bark: {
          DEFAULT: "#6B4F3A",
          light: "#82634C",
        },
        attention: {
          DEFAULT: "#C8643C",
          soft: "#F9ECE7",
        },
        text: {
          DEFAULT: "#22261F",
          muted: "#66695C",
        },
        border: "#E3DCC8",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-mukta)", "sans-serif"],
        devanagari: ["var(--font-mukta)", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(31, 77, 58, 0.05), 0 1px 3px -1px rgba(31, 77, 58, 0.03)",
        card: "0 4px 14px -3px rgba(31, 77, 58, 0.06), 0 2px 6px -2px rgba(31, 77, 58, 0.04)",
      },
      animation: {
        "leaf-sprout": "sprout 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "gentle-pulse": "gentlePulse 2s ease-in-out infinite",
      },
      keyframes: {
        sprout: {
          "0%": { transform: "scale(0.8) translateY(4px)", opacity: "0" },
          "100%": { transform: "scale(1) translateY(0)", opacity: "1" },
        },
        gentlePulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
