import React from 'react'

import Link from '../components/link'
import { SummaryAndScorePageWrapper } from '../components/shared/SummaryAndScorePageWrapper'

const PageNotFoundErrorPage = () => (
  <SummaryAndScorePageWrapper>
    <h2>404</h2>
    <p>Page not found :(</p>
    <Link href="/" type="primary">
      Back to home
    </Link>
  </SummaryAndScorePageWrapper>
)

export default PageNotFoundErrorPage
