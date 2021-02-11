export const HOST =
  process.env.NODE_ENV === 'production'
    ? 'https://ohtu-csaos-staging.herokuapp.com'
    : 'http://localhost:3000'
