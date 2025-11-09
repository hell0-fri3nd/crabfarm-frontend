/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%": { transform: "translateY(0)", opacity: "0.7" },
          "50%": { opacity: "0.9" },
          "100%": { transform: "translateY(-120vh)", opacity: "0" },
        },
      },
      animation: {
        float: "float linear infinite",
      },
    },
  },
  plugins: [],
}
