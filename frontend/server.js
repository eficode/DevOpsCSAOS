// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware')

const backendUrl = process.env.NODE_ENV === 'test' ? 'http://localhost:5001' :
  process.env.BACKEND_URL || 'http://localhost:5000'

const port = process.env.NODE_ENV === 'test' ? 3001 :
  process.env.PORT || 3000

const dev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
const app = next({ dev })
const handle = app.getRequestHandler()

const apiPaths = {
  '/api': {
    target: backendUrl,
    pathRewrite: {
      '^/api': '/api',
    },
    changeOrigin: true,
  },
}

const isDevelopment = process.env.NODE_ENV === 'development'
const isTest = process.env.NODE_ENV === 'test'

app
  .prepare()
  .then(() => {
    const server = express()

    if (isDevelopment || isTest) {
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
