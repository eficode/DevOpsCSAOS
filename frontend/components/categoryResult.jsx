import React from 'react';
import styled from 'styled-components';

export const CategoryResultContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 60px;
  align-items: center;
  width: 85%;
  margin: 30px;
`

export const CategoryText = styled.div`
  font-family: Merriweather;
  font-size: 14px;
  width: 60%;
  line-height: 2;
`

export const CategoryTitle = styled.h3`
  font-family: Montserrat;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.blueDianne}
`

export const CategoryImage = styled.div`
  width: 40%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const Placeholder = styled.div`
  width: 220px;
  height: 170px;
  background: ${({ theme }) => theme.colors.nevada}
`

const CategoryResult = ({ userResult, maxResult }) => (
  <CategoryResultContainer>
    <CategoryText>
      <CategoryTitle>Test</CategoryTitle>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </CategoryText>
    <CategoryImage>
      <Placeholder />
    </CategoryImage>
  </CategoryResultContainer>
)

export default CategoryResult
