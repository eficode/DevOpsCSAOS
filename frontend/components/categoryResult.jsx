import React from 'react'
import styled from 'styled-components'
import CategoryResultChart from './categoryResultChart'

export const CategoryResultContainer = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 35px 0 60px 0;
  column-gap: 60px;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints[0]}) {
    flex-direction: column;
  }
`

export const CategoryText = styled.div`
  font-family: Merriweather;
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

  @media screen and (max-width: ${({ theme }) => theme.breakpoints[0]}) {
    width: 50%;
    margin-bottom: -80px;
  }
`

const CategoryDescription = styled.div`
  font-size: 15px;
`

const CategoryResult = ({
  userResult,
  maxResult,
  category,
  description,
  resultText,
  index,
  renderMobileLayout,
}) => {
  const CategoryTextContainer = () => (
    <CategoryText>
      <CategoryTitle>
        {category} {userResult} / {maxResult}
      </CategoryTitle>
      <CategoryDescription>
        <strong>{description}</strong> {resultText}
      </CategoryDescription>
    </CategoryText>
  )
  // if mobile should be rendered, the toggle disables the desktop feature
  // that puts speedometer on alternating sides of the text
  // -> speedometer goes above text in every categoryresult
  return (
    <CategoryResultContainer>
      {index % 2 === 0 && !renderMobileLayout && <CategoryTextContainer />}
      <CategoryImage>
        <CategoryResultChart userResult={userResult} maxResult={maxResult} />
      </CategoryImage>
      {(index % 2 !== 0 || renderMobileLayout) && <CategoryTextContainer />}
    </CategoryResultContainer>
  )
}

export default CategoryResult
