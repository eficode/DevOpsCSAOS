import React from 'react';
import styled from 'styled-components';

export const ResultCircle = styled.div`
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
`

export const Result = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`

const TotalResult = ({ userResult, maxResult }) => (
  <ResultCircle>
    <Result role="resultCircle">
      {userResult}
      /
      {maxResult}
    </Result>
  </ResultCircle>
)

export default TotalResult
