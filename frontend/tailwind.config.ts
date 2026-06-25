import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graphite: {
          950: "#121215",
          900: "#1a1a1e",
          800: "#222226",
          700: "#2c2c31",
        },
        amber: {
          400: "#f2a93b",
          500: "#e89a23",
        },
        sage: {
          400: "#8fae8b",
        },
        bone: "#ece8e1",
        mute: "#8c8a86",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};

export default config;
