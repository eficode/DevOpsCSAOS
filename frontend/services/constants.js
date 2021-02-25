const getHost = () => {
  const { NODE_ENV, PORT } = process.env
  if (NODE_ENV === 'development') {
    /*
      This might be misleading,
      but the server.js file rewrites all /api requests to process.env.API_URL
      (default is localhost:5000 when npm run dev is run)
      The reason for this is that this fixes cors policy error when running frontend.
    */
    return `http://localhost:${PORT}`
  }
  /*
      This is used when build is created
  */
  return process.env.API_URL
}

export const HOST = getHost()
