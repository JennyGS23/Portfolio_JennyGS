/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
        //   primary: '#e2997c',
          primary: '#2a97aa',
          secondary: '#1e1e24',
        },
      },
    },
    plugins: [],
  }