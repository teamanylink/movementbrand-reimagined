import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      scale: {
        '102': '1.02',
        '105': '1.05',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#40E0D0",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#FF6B6B",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#4169E1",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F0F0F0",
          foreground: "#666666",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "scroll": {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
        "fade-in-out": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "25%, 75%": {
            opacity: "1",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-10px)",
          }
        },
        "glow": {
          "0%": {
            boxShadow: "0 0 0 0 rgba(255, 255, 255, 0.4)",
          },
          "50%": {
            boxShadow: "0 0 20px 5px rgba(255, 255, 255, 0.4)",
          },
          "100%": {
            boxShadow: "0 0 0 0 rgba(255, 255, 255, 0.4)",
          }
        }
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "scroll": "scroll 25s linear infinite",
        "fade-text": "fade-in-out 4s ease-in-out",
        "glow-pulse": "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;