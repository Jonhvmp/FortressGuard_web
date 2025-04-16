const config = {
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
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
      },
      fontFamily: {
        sans: ["var(--font-rajdhani)", "var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "var(--font-geist-mono)", "monospace"],
        orbitron: ["var(--font-orbitron)", "sans-serif"],
        cyber: ["var(--font-orbitron)", "monospace"],
        terminal: ["var(--font-jetbrains-mono)", "monospace"],
        tech: ["var(--font-rajdhani)", "sans-serif"],
      },
      animation: {
        "text-blink": "textBlink 1s ease-in-out infinite alternate",
        "glitch": "glitch 0.5s linear infinite",
        "pulse-slow": "pulse 3s linear infinite",
      },
      keyframes: {
        textBlink: {
          "0%": { opacity: "0.2" },
          "100%": { opacity: "1" },
        },
        glitch: {
          "0%, 100%": {
            textShadow: "0.05em 0 0 rgba(10, 255, 10, 0.75), -0.05em 0 0 rgba(0, 153, 255, 0.75)"
          },
          "25%": {
            textShadow: "-0.05em -0.025em 0 rgba(10, 255, 10, 0.75), 0.025em 0.025em 0 rgba(0, 153, 255, 0.75)"
          },
          "50%": {
            textShadow: "0.025em 0.05em 0 rgba(10, 255, 10, 0.75), -0.05em -0.025em 0 rgba(0, 153, 255, 0.75)"
          },
          "75%": {
            textShadow: "-0.05em -0.05em 0 rgba(10, 255, 10, 0.75), -0.025em 0.05em 0 rgba(0, 153, 255, 0.75)"
          },
        },
      },
      backdropFilter: {
        "none": "none",
        "blur": "blur(20px)",
      },
    },
  },
  plugins: [],
};

export default config;
