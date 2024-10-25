/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:"selector",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Pastikan path ini sesuai dengan struktur direktori proyekmu
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'), // Pastikan 'daisyui' diimpor dengan benar
  ],
};
