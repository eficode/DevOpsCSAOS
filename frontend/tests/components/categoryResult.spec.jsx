/* eslint-disable no-undef */
import React from 'react'
import { mount } from 'enzyme'
import CategoryResult from '../../components/categoryResult'
import ThemeWrapper from '../testutils/themeWrapper'

describe('Category Result Component', () => {
  it('Renders the component with correct data', () => {
    const component = mount(
      <ThemeWrapper>
        <CategoryResult userResult={15} maxResult={25} category="Pullat" description="Hyvin on pullat uunissa" index={1} />
      </ThemeWrapper>,
    )

    expect(component.text()).toContain('15/25')
    expect(component.text()).toContain('Hyvin on pullat uunissa')
  })
})
