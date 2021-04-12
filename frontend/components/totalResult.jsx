import React from 'react'
import styled from 'styled-components'

export const ResultCircle = styled.article`
  display: grid;
  place-items: center;

  width: 200px;
  height: 200px;
  border-radius: 50%;
  font-size: 32px;
  font-family: Montserrat;
  font-weight: bold;
  background: ${({ theme }) => theme.colors.gold};
  text-align: center;
  position: relative;
  margin-bottom: 30px;

  @media screen and (max-width: ${({ theme }) =>
      theme.breakpoints.mediumMobile}) {
    width: 180px;
    height: 180px;
  }
`

const TotalResult = ({ userResult, maxResult }) => (
  <ResultCircle>
    {userResult}/{maxResult}
  </ResultCircle>
)

export default TotalResult
