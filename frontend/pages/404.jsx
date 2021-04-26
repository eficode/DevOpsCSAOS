import React from 'react'

import Link from '../components/link'
import InnerContentWrapper from '../components/shared/InnerContentWrapper'

const PageNotFoundErrorPage = () => (
  <InnerContentWrapper>
    <h2>404</h2>
    <p>Page not found :(</p>
    <Link href="/" type="primary">
      Back to home
    </Link>
  </InnerContentWrapper>
)

export default PageNotFoundErrorPage
