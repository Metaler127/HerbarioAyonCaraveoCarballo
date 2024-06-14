/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      "md": {"min": "700px", "max" : "1023px"}
    }
  },
  plugins: [],
}

