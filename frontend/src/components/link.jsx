import React from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import Link from 'next/link'

/**
 * Shared Link styles
 */

const StyledBaseLink = styled(Button)`
  font-family: Montserrat;
  font-weight: bold;
  font-size: 14px;
  text-decoration: none;
  margin: 10px;
  min-width: 120px;
  height: 45px;
  text-align: center;
  border-radius: 5px;
  border-width: 0px;
  margin: 50px 25px 15px 25px;
  padding: 10px 15px;
  cursor: pointer;
  text-transform: none;
`

/**
 * Variants of our generic styled Link component
 *  */
const StyledPrimaryLink = styled(StyledBaseLink)`
  background-color: ${({ theme }) => theme.colors.blueDianne};
  color: white;

  &:hover {
    background-color: ${({ theme }) => theme.colors.easternBlue};
  }
`

const StyledSecondaryLink = styled(StyledBaseLink)`
  background-color: ${({ theme }) => theme.colors.cararra};
  color: ${({ theme }) => theme.colors.nevada};

  &:hover {
    background-color: ${({ theme }) => theme.colors.silver};
  }
`

const StyledLink = ({ children, type, href }) => {
  if (type === 'primary') {
    return (
      <Link href={href} passHref>
        <StyledPrimaryLink variant="contained" component="a">
          {children}
        </StyledPrimaryLink>
      </Link>
    )
  }

  if (type === 'secondary') {
    return (
      <Link href={href} passHref>
        <StyledSecondaryLink variant="contained" component="a">
          {children}
        </StyledSecondaryLink>
      </Link>
    )
  }

  console.warn('custom link only has primary and secondary types')

  return <Link href={href}>{children}</Link>
}

export default StyledLink
