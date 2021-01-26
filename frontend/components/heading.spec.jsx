/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import Heading from './heading';

/** @test {Heading Component} */
describe('Heading Component', () => {
  it('should render without crashing', () => {
    const wrapper = mount(<Heading label="test" />);

    expect(wrapper.find('h1')).toHaveLength(1);
  });
});
