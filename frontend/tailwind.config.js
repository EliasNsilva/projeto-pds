/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        branco: "var(--branco)",
        "cinzas-100": "var(--cinzas-100)",
        "escuros-100": "var(--escuros-100)",
        "escuros-200": "var(--escuros-200)",
        "escuros-300": "var(--escuros-300)",
        "escuros-400": "var(--escuros-400)",
        "escuros-50": "var(--escuros-50)",
        "escuros-500": "var(--escuros-500)",
        "escuros-700": "var(--escuros-700)",
        "escuros-900": "var(--escuros-900)",
        principalazul: "var(--principalazul)",
        principalverde: "var(--principalverde)",
        "principalverde-escuro": "var(--principalverde-escuro)",
        "accordion-bg": "var(--accordion-bg)",
        "accordion-border": "var(--accordion-border)",
        "shades-0": "var(--shades-0)",
      },
      fontFamily: {
        "paragraph-p2-semi-bold": "var(--paragraph-p2-semi-bold-font-family)",
        "text-md-semibold": "var(--text-md-semibold-font-family)",
      },
      boxShadow: {
        "bot-o": "var(--bot-o)",
      },
    },
  },
  plugins: [],
};
