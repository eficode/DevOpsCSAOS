import styled from 'styled-components'

export const InnerContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;
  width: 90%;

  height: auto;
  min-height: 100%;
  min-height: 25rem;

  @media screen and (max-width: ${({ theme }) =>
      theme.breakpoints.wideMobile}) {
    min-height: 20;
  }

  @media screen and (max-width: ${({ theme }) =>
      theme.breakpoints.mediumMobile}) {
    position: absolute;
    height: auto;
    min-height: 100%;
  }

  margin: 0;
  padding: 7% 0;
  background-color: white;
  border-radius: 0.5rem;
`

export default InnerContentWrapper
