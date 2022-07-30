/** @type {import('tailwindcss').Config} */
const forms = require("@tailwindcss/forms");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [forms],
};
