/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [ "./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}",  "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        "product-1": "#965AD6"
      }
    },
  },
  plugins: [],
}

