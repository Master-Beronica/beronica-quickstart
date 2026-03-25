import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Primary: Warm Lavender */
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#D4C5F9",
          300: "#B9A8F0",
          400: "#A99ADE",
          500: "#8B7EC8",
          600: "#6B5EA8",
          700: "#554A8A",
          800: "#3D3556",
          900: "#2A2440",
        },
        /* Accent: Terracotta */
        accent: {
          50: "#FFF7ED",
          100: "#FDEBD6",
          200: "#FACBA8",
          300: "#E8956D",
          400: "#D97757",
          500: "#C4603F",
          600: "#A34A2E",
          700: "#7A3722",
          800: "#52261A",
          900: "#3A1B13",
        },
        /* Semantic */
        success: "#6B8F71",
        warning: "#E8956D",
        destructive: "#D9534F",
        info: "#5B9BD5",
        /* Surface (dark mode) */
        surface: {
          DEFAULT: "#242428",
          elevated: "#2C2C32",
        },
        /* Keep brand as alias for primary (backward compat) */
        brand: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#D4C5F9",
          300: "#B9A8F0",
          400: "#A99ADE",
          500: "#8B7EC8",
          600: "#6B5EA8",
          700: "#554A8A",
          800: "#3D3556",
          900: "#2A2440",
          950: "#1C1730",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "system-ui", "sans-serif"],
        display: ["Playfair Display", "serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
      },
      boxShadow: {
        sm: "0 1px 4px rgba(0, 0, 0, 0.04)",
        md: "0 4px 12px rgba(0, 0, 0, 0.06)",
        lg: "0 8px 24px rgba(0, 0, 0, 0.08)",
        glass: "0 4px 20px rgba(0, 0, 0, 0.06)",
      },
      animation: {
        "gradient-x": "gradient-x 6s ease infinite",
        "fade-in": "fade-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "slide-up": "slide-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        spring: "spring 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(169, 154, 222, 0.15)" },
          "100%": { boxShadow: "0 0 40px rgba(169, 154, 222, 0.3)" },
        },
        spring: {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
