/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TotalResult from '../../components/totalResult'
import ThemeWrapper from '../testutils/themeWrapper'

describe('Total Result Component', () => {
  it('Renders the component with correct data', () => {
    render(
      <ThemeWrapper>
        <TotalResult userResult={15} maxResult={100} />
      </ThemeWrapper>
    )

    expect(screen.getByRole('article')).toHaveTextContent('15/100')
  })
})
