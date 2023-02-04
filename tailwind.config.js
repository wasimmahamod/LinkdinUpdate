/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [  "./src/**/*.{js,jsx,ts,tsx}",
  './src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js',

],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito','sans-serif'],
      },
      colors: {
        primary: '#11175D',
      },
      maxWidth: {
        containerfluid: '1404px',
        container:'1320px'
      }
     
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
