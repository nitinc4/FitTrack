/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C9E4CA',
        secondary: '#87BBA2',
        tertiary: '#55828B',
        dark: '#3B6064',
        darker: '#364958',
      },
    },
  },
  plugins: [],
}