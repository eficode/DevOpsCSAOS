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
}

export const HOST = getHost()
