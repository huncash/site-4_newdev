import type { Config } from "tailwindcss";
import { themeConfig } from "./src/styles/theme";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...themeConfig.colors,
      },
      borderRadius: {
        ...themeConfig.borderRadius,
        lg: "calc(0.375rem + 2px)",
        md: "0.375rem",
        sm: "calc(0.375rem - 2px)",
      },
      fontFamily: {
        sans: ['"Open Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
