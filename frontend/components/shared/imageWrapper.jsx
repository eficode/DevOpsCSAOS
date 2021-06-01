/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'



/**
 * define component type and variant through props
 *  */
const ImageWrapper = (props) => {
  const { children } = props
  return <StyledHeading {...props}>{children}</StyledHeading>
}

export default ImageWrapper