import React from 'react';
import styled from 'styled-components';

export const ResultCircle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  font-size: 36px;
  background: ${({ theme }) => theme.colors.gold};
  text-align: center;
  position: relative;
`

export const Result = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`

const Results = ({ results }) => (
  <ResultCircle><Result>10/100</Result></ResultCircle>
)

export default Results
