/* eslint-disable no-undef */
import React from 'react'
import { mount } from 'enzyme'
import Button from './button'

/** @test {Button Component} */
describe('Button Component', () => {
  it('should show', () => {
    const wrapper = mount(<Button label="test" />)

    expect(wrapper.find('h1')).toHaveLength(1)
  })
})
