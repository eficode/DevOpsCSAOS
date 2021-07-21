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
  font-size: 12px;
  text-decoration: none;
  text-align: center;
  border-radius: 6px;
  border-width: 0px;
  margin: 1%;
  padding: 1%;
  cursor: pointer;
  text-transform: none;
  size: small;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints[1]}) {
    height: 6vw;
    padding: 2vw;
    margin: 1vw;
  }
`

/**
 * Variants of our generic styled Link component
 *  */
const StyledPrimaryLink = styled(StyledBaseLink)`
  background-color: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.blueDianne};
  float: right;
  &:hover {
    background-color: ${({ theme }) => theme.colors.amber};
  }
`

const StyledSecondaryLink = styled(StyledBaseLink)`
  background-color: white;
  color: ${({ theme }) => theme.colors.blueDianne};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.whiteSmoke};
  }
`
const StyledTertiaryLink = styled(StyledBaseLink)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.blueDianne};
  border-color: transparent;
  box-shadow: none;

  &:hover {
    transition: none;
    border-color: transparent;
    background-color: transparent;
  }
`

const StyledHiddenLink = styled(StyledBaseLink)`
  visibility: hidden;
`

const StyledLink = ({ children, type, href }) => {
  if (type === 'primary') {
    return (
      <Link scroll={false} href={href} passHref>
        <StyledPrimaryLink variant="contained" component="a">
          {children}
        </StyledPrimaryLink>
      </Link>
    )
  }

  if (type === 'secondary') {
    return (
      <Link scroll={false} href={href} passHref>
        <StyledSecondaryLink variant="contained" component="a">
          {children}
        </StyledSecondaryLink>
      </Link>
    )
  }

  if (type === 'tertiary') {
    return (
      <Link href={href} passHref>
        <StyledTertiaryLink variant="contained" component="a">
          {children}
        </StyledTertiaryLink>
      </Link>
    )
  }

  if (type === 'hidden') {
    return (
      <Link href={href} passHref>
        <StyledHiddenLink variant="contained" component="a">
          {children}
        </StyledHiddenLink>
      </Link>
    )
  }

  console.warn('Check allowed link types')

  return <Link href={href}>{children}</Link>
}

export default StyledLink
