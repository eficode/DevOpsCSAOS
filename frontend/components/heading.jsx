import React from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const StyledHeading = styled(Typography)`
  color: ${({ theme }) => theme.colors.blueDianne};
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: normal;
`

/**
 * define component type and variant through props
 *  */
const Heading = (props) => {
  const { children } = props
  return <StyledHeading {...props}>{children}</StyledHeading>
}

export default Heading
