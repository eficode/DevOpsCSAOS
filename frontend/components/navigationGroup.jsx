import React from 'react'
import styled from 'styled-components'

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

/**
 * This component renders all the the links that it is wrapped around
 *  */
const NavigationGroup = ({ children }) => <NavWrapper>{children}</NavWrapper>

export default NavigationGroup
