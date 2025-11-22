/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        errorContainer: "#ffeaea",
        primary: "#2563EB",
        white: "#FFFFFF",
        grayLight: "#F2F2F2",
        graySoft: "#E0E0E0",
        grayDark: "#828282",
        black: "#000000",
        textPrimary: "#333333",
        suave: "#D4E3FC",
        green: "#27AE60",
        textSecondary: "#828282",
        link: "#9B51E0",
        success: "#27AE60",
        error: "#EB5757",
      },

      fontFamily: {
        regular: ["Poppins_400Regular"],
        medium: ["Poppins_500Medium"],
      },
      fontSize: {
        'h1': '2.5rem',
        'h2': '1.8rem',
        'h3': '1.5rem',
        'body': '1rem',
        'body-sm': '0.9rem',
      },
    },
  },

  plugins: [],
};
