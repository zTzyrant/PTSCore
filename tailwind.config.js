/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#436372",
        secondary: "#243F4D",
        accent: "#A3BBC8",
        neutral: "#1B1E23",
        "base-100": "#ffffff",
        info: "#3abff8",
        success: "#36d399",
        warning: "#fbbd23",
        error: "#f87272",
        brand: "#549fe5",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        russoone: ["Russo One", "sans-serif"],
        quicksand: ["Quicksand", "sans-serif"],
      },
    },
  },
  daisyui: {
    themes: ["lofi"],
  },
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
}
