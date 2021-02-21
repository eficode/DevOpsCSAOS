/* eslint-disable no-undef */
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CategoryResult from '../../components/categoryResult'
import ThemeWrapper from '../testutils/themeWrapper'

describe('Category Result Component', () => {
  it('renders the component with correct text and result', () => {
    render(
      <ThemeWrapper>
        <CategoryResult
          userResult={15}
          maxResult={25}
          category="Pullat"
          description="Hyvin on pullat uunissa"
          index={1}
        />
      </ThemeWrapper>,
    )

    expect(screen.getByRole('article')).toBeInTheDocument()
    expect(screen.getByRole('article')).toHaveTextContent(
      'Hyvin on pullat uunissa',
    )
    expect(screen.getByRole('article')).toHaveTextContent('15/25')
  })
})
