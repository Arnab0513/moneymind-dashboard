/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Manrope'", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#e6fff4",
          100: "#b3ffe0",
          200: "#66ffbf",
          300: "#00ff87",
          400: "#00e67a",
          500: "#00cc6c",
          600: "#00a357",
          700: "#007a41",
          800: "#00522c",
          900: "#002914",
        },
        surface: {
          900: "#060b18",
          800: "#0a1025",
          700: "#0f1932",
          600: "#162040",
          500: "#1e2d52",
          400: "#263a65",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-1":
          "radial-gradient(at 40% 20%, hsla(160,100%,60%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(220,100%,60%,0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(200,100%,60%,0.08) 0px, transparent 50%)",
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
        glow: "0 0 20px rgba(0,255,135,0.25)",
        "glow-lg": "0 0 40px rgba(0,255,135,0.2)",
        card: "0 8px 32px rgba(0,0,0,0.4)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-up": "slideUp 0.4s ease forwards",
        "slide-in-left": "slideInLeft 0.4s ease forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        slideUp: { "0%": { opacity: 0, transform: "translateY(20px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        slideInLeft: { "0%": { opacity: 0, transform: "translateX(-20px)" }, "100%": { opacity: 1, transform: "translateX(0)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
    },
  },
  plugins: [],
};
