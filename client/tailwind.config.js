/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "19.5px"],
      lg: ["18px", "21.94px"],
      xl: ["20px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["28px", "50px"],
      "4xl": ["48px", "58px"],
      "8xl": ["96px", "106px"],
    },
    extend: {
      fontFamily: {
        work: ["Work Sans", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        primary: "rgb(75, 107, 251)", // #4B6BFB
        lightprimary: "rgb(95, 127, 255)", // #5F7FFF
        darkprimary: "rgb(55, 87, 231)", // #3757E7
        secondary: "rgb(244, 244, 245)", // #F4F4F5
        "secondary-100": "rgb(232, 232, 234)", // #E8E8EA
        "secondary-200": "rgb(220, 221, 223)", // #DCDDDF
        "secondary-300": "rgb(186, 186, 191)", // #BABABF
        "secondary-400": "rgb(151, 152, 159)", // #97989F
        "secondary-500": "rgb(105, 106, 117)", // #696A75
        "secondary-600": "rgb(59, 60, 74)", // #3B3C4A
        "secondary-700": "rgb(36, 37, 53)", // #242535
        "secondary-800": "rgb(24, 26, 42)", // #181A2A
        "secondary-900": "rgb(20, 22, 36)", // #141624

        "theme-bg": "rgb(var(--theme-bg) / <alpha-value>)",
        "theme-fbg": "rgb(var(--theme-fbg) / <alpha-value>)",
        "theme-fcard": "rgb(var(--theme-fcard) / <alpha-value>)",
        "theme-border": "rgb(var(--theme-border) / <alpha-value>)",
        "theme-fborder": "rgb(var(--theme-fborder) / <alpha-value>)",
        "theme-maintext": "rgb(var(--theme-maintext) / <alpha-value>)",
        "theme-subtext1": "rgb(var(--theme-subtext1) / <alpha-value>)",
        "theme-subtext2": "rgb(var(--theme-subtext2) / <alpha-value>)",
        "theme-subtext3": "rgb(var(--theme-subtext3) / <alpha-value>)",
        "theme-skeleton": "rgb(var(--theme-skeleton) / <alpha-value>)",
        "theme-loading": "rgb(var(--theme-loading) / <alpha-value>)",
      },
      boxShadow: {
        base: "0px 12px 24px -6px rgba(24, 26, 42, 0.12)",
        "2xl": "0 5px 20px rgba(0, 0, 0, 0.1)",
      },
      screens: {
        wide: "1440px",
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};
