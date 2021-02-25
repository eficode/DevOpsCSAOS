<<<<<<< HEAD
const getHost = () => {
  if (process.env.HOST) {
    return process.env.HOST
  }

  //when starting in test mode, node env is development here but test in server.js
  console.log(process.env.NODE_ENV)

  const PORT = process.env.NODE_ENV === 'test' ?
    3001 : 3000

  console.log(`port: ${PORT}`)
  
  return process.env.NODE_ENV === 'production'
    ? 'https://ohtu-csaos-staging.herokuapp.com'
    : `http://localhost:${PORT}`
=======
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()


const getHost = () => {

  if (process.env.NODE_ENV === 'development') {
    /*
      This might be misleading,
      but the server.js file rewrites all /api requests to process.env.API_URL
      (default is localhost:5000 when npm run dev is run)
      The reason for this is that this fixes cors policy error when running frontend.
    */
    return `http://localhost:${publicRuntimeConfig.PORT}`
  }
  /*
    This is used when build is created
  */
  return publicRuntimeConfig.API_URL
>>>>>>> origin/refactor-frontend
}

export const HOST = getHost()
