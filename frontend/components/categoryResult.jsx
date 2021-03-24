import React from 'react'
import styled from 'styled-components'
import CategoryResultChart from './categoryResultChart'

export const CategoryResultContainer = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 35px 0 60px 0;
  column-gap: 60px;
`

export const CategoryText = styled.div`
  font-family: Merriweather;
  font-size: 13px;
  line-height: 2.2;
  width: 65%;
  text-align: justify;
  text-justify: auto;
`

export const CategoryTitle = styled.h3`
  font-family: Montserrat;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.blueDianne};
`

export const CategoryImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  min-height: 200px;
  margin-bottom: -100px;
`

const CategoryResult = ({
  userResult,
  maxResult,
  category,
  description,
  index,
}) => {
  if (index % 2 === 0) {
    return (
      <CategoryResultContainer>
        <CategoryText>
          <CategoryTitle>
            {category} {userResult} / {maxResult}
          </CategoryTitle>
          {description}
        </CategoryText>
        <CategoryImage>
          <CategoryResultChart userResult={userResult} maxResult={maxResult} />
        </CategoryImage>
      </CategoryResultContainer>
    )
  }
  return (
    <CategoryResultContainer>
      <CategoryImage>
        <CategoryResultChart userResult={userResult} maxResult={maxResult} />
      </CategoryImage>
      <CategoryText>
        <CategoryTitle>
          {category} {userResult} / {maxResult}
        </CategoryTitle>
        {description}
      </CategoryText>
    </CategoryResultContainer>
  )
}

export default CategoryResult
