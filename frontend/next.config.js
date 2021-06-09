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
  // webpack: config => {
  //   config.module.rules.push(
  //     {
  //       test: /\.(png|jpe?g|gif)$/i,
  //       use: [
  //         {
  //           loader: 'file-loader',
  //           options: {
  //             outputPath: '../public/assets/', // if you don't use ../ it will put it inside ".next" folder by default
  //             publicPath: '/assets/',

  //           }  

  //         },
  //       ],
  //     },
  //   )
  //   return config
  // }
}))
