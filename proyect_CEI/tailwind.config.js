
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-cei': '#DDE7FC',
        'orange-cei': '#EA594C',
        'black-cei': '#252525',
        'camell-cei': '#F4F4EE',
        'navy-blue-cei': '#1669b1'
      },
    },
  },
  plugins: [],
});
