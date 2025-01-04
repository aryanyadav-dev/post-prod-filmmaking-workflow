/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'dotted-pattern': 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 1px, transparent 1px)',
      },
      backgroundSize: {
        'dotted-size': '20px 20px',
      },
    },
  },
  plugins: [],
};
