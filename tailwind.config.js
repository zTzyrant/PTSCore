/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  darkMode: "false",
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
        roboto: ["Roboto", "sans-serif"],
      },
      spacing: {
        unset: "unset",
        px: "1px",
        0: "0px",
        0.4: "0.1rem",
        0.5: "0.125rem",
        0.6: "0.15rem",
        0.75: "0.2rem",
        1: "0.25rem",
        1.2: "0.3rem",
        1.25: "0.3125rem",
        1.4: "0.35rem",
        1.5: "0.375rem",
        1.6: "0.4rem",
        1.75: "0.4375rem",
        1.8: "0.45rem",
        2: "0.5rem",
        2.2: "0.55rem",
        2.5: "0.625rem",
        2.6: "0.65rem",
        2.7: "0.675rem",
        2.8: "0.7rem",
        3: "0.75rem",
        3.4: "0.85rem",
        3.5: "0.875rem",
        3.6: "0.9rem",
        4: "1rem",
        4.5: "1.125rem",
        4.8: "1.2rem",
        5: "1.25rem",
        5.3: "1.3rem",
        5.4: "1.35rem",
        5.5: "1.375rem",
        5.6: "1.4rem",
        6: "1.5rem",
        6.5: "1.625rem",
        7: "1.75rem",
        8: "2rem",
        9: "2.25rem",
        10: "2.5rem",
        11: "2.75rem",
        12: "3rem",
        13: "3.25rem",
        14: "3.5rem",
        16: "4rem",
        19: "4.75rem",
        20: "5rem",
        24: "6rem",
        25: "6.25rem",
        28: "7rem",
        30: "7.5rem",
        32: "8rem",
        34: "8.5rem",
        36: "9rem",
        40: "10rem",
        42: "10.5rem",
        44: "11rem",
        46: "11.5rem",
        48: "12rem",
        50: "12.5rem",
        52: "13rem",
        54: "13.5rem",
        56: "14rem",
        60: "15rem",
        64: "16rem",
        68: "17rem",
        72: "18rem",
        75: "18.75rem",
        80: "20rem",
        85: "22rem",
        90: "22.5rem",
        92: "23rem",
        96: "24rem",
        100: "25rem",
        116: "29rem",
        120: "30rem",
        125: "31.25rem",
        135: "33.75rem",
        160: "40rem",
        180: "45rem",
        240: "60rem",
        285: "71.25rem",
        330: "82.5rem",
        "70/100": "70%",
        "31/100": "31%",
        "15/100": "15%",
        "1/100": "1%",
        "1/10": "10%",
        "1/2": "50%",
      },
      lineHeight: ({ theme }) => ({
        ...theme("spacing"),
        none: "1",
        tighter: "1.2",
        tight: "1.25",
        snug: "1.375",
        button: "1.3",
        pro: "1.4",
        normal: "1.5",
        default: "1.6",
        relaxed: "1.625",
        loose: "2",
      }),
      listStyleType: {
        none: "none",
        disc: "disc",
        decimal: "decimal",
      },
      margin: ({ theme }) => ({
        auto: "auto",
        ...theme("spacing"),
      }),
      maxHeight: ({ theme }) => ({
        ...theme("spacing"),
        full: "100%",
        screen: "100vh",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
      }),
      maxWidth: ({ theme, breakpoints }) => ({
        ...theme("spacing"),
        sidebar: "15.625rem",
        none: "none",
        0: "0rem",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2xl": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
        prose: "65ch",
        ...breakpoints(theme("screens")),
      }),
      minHeight: ({ theme }) => ({
        auto: "auto",
        ...theme("spacing"),
        0: "0px",
        6: "1.5rem",
        full: "100%",
        screen: "100vh",
        "85-screen": "85vh",
        "75-screen": "75vh",
        "50-screen": "50vh",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
      }),
      minWidth: ({ theme }) => ({
        auto: "auto",
        ...theme("spacing"),
        0: "0px",
        full: "100%",
        min: "min-content",
        max: "max-content",
        fit: "fit-content",
      }),
    },
  },
  daisyui: {
    themes: ["lofi"],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}
