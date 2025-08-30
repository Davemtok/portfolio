/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // 👈 enables dark mode toggle
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",


  ],
  theme: {
    extend: {
      colors:
      {
        // Map Tailwind color tokens to CSS variables
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        border: "hsl(var(--border))",
        muted: "hsl(var(--muted))",

        button:
        {
          DEFAULT: "var(--btn-bg)",
          text: "var(--btn-text)",
          hover: "var(--btn-hover)",
        },
      },
    },
  },
  plugins: [],
};
