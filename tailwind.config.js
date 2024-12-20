/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGray: "#f9f9f9",
        lightBlue: "#f0f4ff",
        hoverGray: "#f1f1f1",
        borderGray: "#d1d1d1",
      },
    },
  },  
}