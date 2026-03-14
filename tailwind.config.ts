import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // New design system tokens
        "bg-primary": "#0A0A0A",
        "bg-navy": "#0A0A1A",
        "bg-card": "#111118",
        "bg-light": "var(--bg-light)",
        "brand-gold": "rgb(var(--accent) / <alpha-value>)",
        "brand-gold-light": "var(--accent-dark)",
        cta: "#F97316",
        "cta-hover": "#FB923C",
        "text-dark": "#0A0A0A",

        // Aliases for old tokens (remove in Phase 6)
        "primary-dark": "#0A0A0A",
        navy: "#0A0A1A",
        "navy-light": "#111118",
        "light-bg": "var(--bg-light)",
        "text-light": "#FAFAFA",
        "accent-red": "#F97316",
        "accent-teal": "rgb(var(--accent) / <alpha-value>)",
        "accent-teal-light": "var(--accent-dark)",
      },
      fontFamily: {
        display: ["var(--font-display-family)"],
        heading: ["var(--font-heading-family)"],
        body: ["var(--font-body-family)"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
