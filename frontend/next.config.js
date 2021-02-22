module.exports = {
  serverRuntimeConfig: {
    myvarpass: 'server-runtime ' + process.env.MYVAR,
  },
  publicRuntimeConfig: {
    port: process.env.PORT,
    env: process.env.NODE_ENV,
  },
  env: {
    myvarpass: 'build-time ' + process.env.MYVAR,
  },
}
