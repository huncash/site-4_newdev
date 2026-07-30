import type { Config } from "tailwindcss";
import { themeConfig } from "../shared-core/styles/theme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "../shared-core/src/**/*.{ts,tsx}",
    "../shared-core/templates/**/*.{ts,tsx}",
    "../shared-core/auth/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...themeConfig.colors,
        brand: {
          DEFAULT: "#3CB4E5",
          foreground: "#0F172A",
          dark: "#0284C7",
        },
        primary: {
          DEFAULT: "#3CB4E5",
          foreground: "#0F172A",
        },
        secondary: {
          DEFAULT: "#1E293B",
          foreground: "#F8FAFC",
        },
        background: "#0F172A",
        foreground: "#F8FAFC",
        muted: {
          DEFAULT: "#1E293B",
          foreground: "#94A3B8",
        },
        border: "#2A364F",
        card: {
          DEFAULT: "#1E293B",
          foreground: "#F8FAFC",
        },
      },
      borderRadius: {
        ...themeConfig.borderRadius,
        lg: "0.75rem",
        md: "calc(0.75rem - 2px)",
        sm: "calc(0.75rem - 4px)",
      },
      fontFamily: {
        sans: ['"Open Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
