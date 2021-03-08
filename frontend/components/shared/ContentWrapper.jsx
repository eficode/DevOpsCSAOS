import styled from 'styled-components'

export const ContentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 4rem;
  margin: 0 4rem;
  font-family: Merriweather;

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
