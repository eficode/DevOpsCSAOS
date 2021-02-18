const getHost = () => {
  if( process.env.HOST ) {
    return process.env.HOST
  } else {
    return process.env.NODE_ENV === 'production'
    ? 'https://ohtu-csaos-staging.herokuapp.com'
    : 'http://localhost:3000'
  }

}

export const HOST = getHost()

