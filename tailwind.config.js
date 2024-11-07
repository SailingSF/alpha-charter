/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['var(--font-outfit)'],
      },
      keyframes: {
        drawLineInfinite: {
          '0%': {
            strokeDasharray: '1000',
            strokeDashoffset: '1000'
          },
          '100%': {
            strokeDashoffset: '0'
          }
        }
      },
      animation: {
        drawLineInfinite: 'drawLineInfinite 10s linear infinite'
      }
    },
  },
  plugins: [],
};
