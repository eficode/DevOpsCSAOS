import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const linkStyle = `
  font-family: inherit;
  font-weight: bold;
  font-size: 15px;
  text-decoration: none;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
  border-width: 0px;
  margin: 10px;
`

const StyledPrimaryLink = styled.div`
  background-color: ${({ theme }) => theme.colors.blueDianne};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.colors.easternBlue};
  }

  ${linkStyle}
`

const StyledSecondaryLink = styled.div`
  background-color: ${({ theme }) => theme.colors.cararra};
  color: ${({ theme }) => theme.colors.nevada};

  &:hover {
    background-color: ${({ theme }) => theme.colors.silver};
  }

  ${linkStyle}
`

const StyledLink = ({ children, type, href}) => {
  if (type === 'primary') {
    return (
      <Link href={href}>
        <StyledPrimaryLink >
            {children}
          </StyledPrimaryLink>
      </Link>    
    )
  }

  if (type === 'secondary') {
    return (
      <Link href={href}>
        <StyledSecondaryLink>
            {children}
          </StyledSecondaryLink>
      </Link>     
    )
  }

  console.warn('custom link only has primary and secondary types')
  return (<></>)
}

export default StyledLink
