import React from 'react'
import styled from 'styled-components'

const BarBackground = styled.div`
  background-color: ${({theme}) => theme.colors.blueDianne};
  height: 2rem;
  border-radius: 1rem;
  margin-top: auto;
  margin: auto;
  position: absolute;
  width: 120%;
  display: flex;
  align-items: center;
  top: 0%;
  left: -10%
`

const ProgressLine = styled.div`
  background-color: ${({theme}) => theme.colors.brandyPunch};
  height: 0.2rem;
  border-radius: 0.1rem;
  width: 90%;
  margin-left: 5%;
`

const ProgressBar = ({ point, total }) => (
  <BarBackground>
    <ProgressLine/>
  </BarBackground>
)

export default ProgressBar
