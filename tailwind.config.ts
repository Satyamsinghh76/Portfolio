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
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border)",
        accent: "var(--accent)",
        "surface-elevated": "var(--surface-elevated)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        display: ["3.75rem", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
        "heading-1": ["3rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "heading-2": ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "heading-3": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        body: ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        caption: ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.04em" }],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        glass: "0 0 0 1px rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.12)",
        "glass-hover": "0 0 0 1px rgba(255,255,255,0.1), 0 16px 48px rgba(0,0,0,0.2)",
        glow: "0 0 60px -12px var(--primary)",
      },
    },
  },
  plugins: [],
};
export default config;
