const withTM = require('next-transpile-modules')([
  'lodash-es',
  'react-d3-speedometer',
])

const optimizedImages = require('next-optimized-images');

module.exports = optimizedImages(withTM({
  optimizedImagesInDev: true,
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    PORT: process.env.PORT,
  },
  trailingSlash: true,
}))
