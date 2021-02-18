import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const linkStyle = `
  font-family: Montserrat;
  font-weight: bold;
  font-size: 14px;
  text-decoration: none;
  margin: 10px;
  min-width: 120px;
  height: 45px;
  text-align:center;
  line-height: 45px;
  border-radius: 5px;
  border-width: 0px;
  margin: 50px 25px 15px 25px;
  padding: 0 20px;

  cursor:pointer;
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

const StyledLink = ({ children, type, href }) => {
  if (type === 'primary') {
    return (
      <Link href={href}>
        <StyledPrimaryLink>{children}</StyledPrimaryLink>
      </Link>
    )
  }

  if (type === 'secondary') {
    return (
      <Link href={href}>
        <StyledSecondaryLink>{children}</StyledSecondaryLink>
      </Link>
    )
  }

  console.warn('custom link only has primary and secondary types')
  return <></>
}

export default StyledLink
