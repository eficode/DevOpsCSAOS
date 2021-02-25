const getHost = () => {

  if ( process.env.NODE_ENV === 'development' ) {
    const PORT = process.env.PORT
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


