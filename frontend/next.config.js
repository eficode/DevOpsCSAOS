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
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
})
