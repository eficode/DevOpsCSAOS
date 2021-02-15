import styled from 'styled-components'

export const ContentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin: 0 auto;
  width: 65%;
  min-height: 70%;
  position: absolute;
  top: 15%;
  left: 17.5%;
  padding: 3rem;
  border-radius: 0.5rem;
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
`
export default ContentWrapper
