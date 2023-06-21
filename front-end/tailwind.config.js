/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", 
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    screens: {
      'sm': '320px',
      // => @media (min-width: 640px) { ... }

      'md': '670px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      lightpurple: '#8E87B3',
      pink: '#A92239',
      white: '#F1EAE0',
      darkpurple: '#252330',
    },
    fontFamily: {
      'merriweather': ['Merriweather Sans'],
      'allura': ['Allura'],
      'cambria':['Cambria']
    },
      extend: {},
  },
  plugins: [],
}

