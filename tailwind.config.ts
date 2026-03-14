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
        "bg-primary": "var(--bg-deep)",
        "bg-navy": "var(--bg-deep)",
        "bg-card": "var(--bg-card-val)",
        "bg-light": "var(--bg-light)",
        "brand-gold": "rgb(var(--accent) / <alpha-value>)",
        "brand-gold-light": "var(--accent-dark)",
        cta: "rgb(var(--cta-val))",
        "cta-hover": "rgb(var(--cta-hover-val))",
        "text-dark": "#0A0A0A",

        // Aliases for old tokens (remove in Phase 6)
        "primary-dark": "var(--bg-deep)",
        navy: "var(--bg-deep)",
        "navy-light": "var(--bg-card-val)",
        "light-bg": "var(--bg-light)",
        "text-light": "#FAFAFA",
        "accent-red": "#F97316",
        "accent-teal": "rgb(var(--accent) / <alpha-value>)",
        "accent-teal-light": "var(--accent-dark)",

        // shadcn UI semantic tokens
        background: "var(--ui-background)",
        foreground: "var(--ui-foreground)",
        card: {
          DEFAULT: "var(--ui-card)",
          foreground: "var(--ui-card-foreground)",
        },
        popover: {
          DEFAULT: "var(--ui-popover)",
          foreground: "var(--ui-popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--ui-primary)",
          foreground: "var(--ui-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--ui-secondary)",
          foreground: "var(--ui-secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--ui-muted)",
          foreground: "var(--ui-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--ui-accent-ui)",
          foreground: "var(--ui-accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--ui-destructive)",
        },
        border: "var(--ui-border)",
        input: "var(--ui-input)",
        ring: "var(--ui-ring)",
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
