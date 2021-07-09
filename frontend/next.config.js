module.exports = {
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    PORT: process.env.PORT,
  },
  trailingSlash: true,
  future: {
    webpack5: true,
  },
}