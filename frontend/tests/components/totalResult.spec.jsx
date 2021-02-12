/* eslint-disable no-undef */
import React from 'react'
import { mount } from 'enzyme'
import TotalResult from '../../components/totalResult'
import ThemeWrapper from '../testutils/themeWrapper'

describe('Total Result Component', () => {
  it('Renders the component with correct data', () => {
    const component = mount(
      <ThemeWrapper>
        <TotalResult userResult={15} maxResult={100} />
      </ThemeWrapper>,
    )

    expect(component.text()).toBe('15/100')
  })
})
