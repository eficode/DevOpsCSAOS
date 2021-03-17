const withTM = require('next-transpile-modules')([
  'lodash-es',
  'react-d3-speedometer',
])

module.exports = withTM({
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    PORT: process.env.PORT,
  },
  trailingSlash: true,
}
})