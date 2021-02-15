import React from 'react';
import styled from 'styled-components';

export const CategoryResultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px 0 120px 0;
  column-gap: 60px;
`

export const CategoryText = styled.div`
  font-family: Merriweather;
  font-size: 13px;
  line-height: 2.2;
  width: 70%;
  text-align: justify;
  text-justify: auto;
`

export const CategoryTitle = styled.h3`
  font-family: Montserrat;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.blueDianne}
`

export const CategoryImage = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 30%;
`

export const Placeholder = styled.div`
  width: 200px;
  height: 200px;
  background: ${({ theme }) => theme.colors.nevada}
`

const CategoryResult = ({
  userResult, maxResult, category, description, index,
}) => {
  if (index % 2 === 0) {
    return (
      <CategoryResultContainer>
        <CategoryText>
          <CategoryTitle>
            {category}
            {' '}
            {userResult}
            /
            {maxResult}
          </CategoryTitle>
          {description}
        </CategoryText>
        <CategoryImage>
          <Placeholder />
        </CategoryImage>
      </CategoryResultContainer>
    )
  }
  return (
    <CategoryResultContainer>
      <CategoryImage>
        <Placeholder />
      </CategoryImage>
      <CategoryText>
        <CategoryTitle>
          {category}
          {' '}
          {userResult}
          /
          {maxResult}
        </CategoryTitle>
        {description}
      </CategoryText>
    </CategoryResultContainer>
  )
}

export default CategoryResult
