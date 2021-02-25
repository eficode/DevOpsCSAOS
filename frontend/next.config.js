module.exports = {
<<<<<<< HEAD
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    PORT: process.env.PORT,
=======
  serverRuntimeConfig: {
    myvarpass: 'server-runtime ' + process.env.MYVAR,
  },
  publicRuntimeConfig: {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
  },
  env: {
    myvarpass: 'build-time ' + process.env.MYVAR,
>>>>>>> 027a0261201021833d9f985033f94152bc9ab319
  },
}
