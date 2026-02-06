/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'valentine-pink': '#ffd6e8',
        'valentine-light': '#fff0f6',
        'valentine-dark': '#ff8fab',
        'valentine-accent': '#ff477e',
        'valentine-button': '#ff4d6d',
      },
    },
  },
  plugins: [],
}
