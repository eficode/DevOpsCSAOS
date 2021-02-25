/*
  This file is NOT used at all, when the next.js build is done!
  This is only for the development server!
*/

// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware')

const port = process.env.PORT
const dev = true
const app = next({ dev })
const handle = app.getRequestHandler()

const apiPaths = {
  '/api': {
    target: process.env.API_URL,
    pathRewrite: {
      '^/api': '/api',
    },
    changeOrigin: true,
  },
}

const isDevelopment = true

app
  .prepare()
  .then(() => {
    const server = express()

    if (isDevelopment) {
      server.use('/api', createProxyMiddleware(apiPaths['/api']))
    }

    server.all('*', (req, res) => handle(req, res))

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log('Error:::::', err)
  })
