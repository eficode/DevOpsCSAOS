import React from 'react'
import styled from 'styled-components'

const NavWrapper = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1%;
  margin-top: 7%;
  width: 100% !important;
  
`

/**
 * This component renders all the the links that it is wrapped around
 *  */
const NavigationGroup = ({ children }) => <NavWrapper>{children}</NavWrapper>

export default NavigationGroup
