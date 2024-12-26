import type { Config } from "tailwindcss";

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = Object.entries(theme('colors')).reduce((acc: Record<string, string>, [key, val]: [string, any]) => {
    if (typeof val === 'object') {
      Object.entries(val).forEach(([k, v]) => {
        acc[`--${key}-${k}`] = v as string;
      });
    } else {
      acc[`--${key}`] = val;
    }
    return acc;
  }, {});

  addBase({
    ':root': allColors,
  });
}

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
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        aurora: "aurora 60s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addVariablesForColors],
} satisfies Config;