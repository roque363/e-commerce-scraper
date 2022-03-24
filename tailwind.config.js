module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: 'rgb(0 0 0 / 7%) 0px 0px 21px 1px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
