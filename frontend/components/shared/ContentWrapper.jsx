import styled from 'styled-components'

export const ContentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5% 20%;

  @media screen and (max-width: ${({theme}) => theme.breakpoints.wideDesktop}) {
    margin: 5% 10%;
  }

  @media screen and (max-width: ${({theme}) => theme.breakpoints.mediumMobile}) {
    margin: 5% 0%;
  }
  
  font-family: Merriweather;
  max-width: 2000px;
  height: auto;
  min-height: 100%;

  p {
    text-align: center;
    line-height: 1.6;
    padding: 0.5rem;
    font-size: 16px;
  }

  h2 {
    font-size: 24px;
  }

  h1,
  h2,
  h3 {
    text-align: center;
  }
`
export default ContentWrapper
