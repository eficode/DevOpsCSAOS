import styled from 'styled-components'

export const QuestionPageContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  

  max-width: 750px;
  min-width: 45vw;
  height: 100%;
  min-height: 400px;
  margin: 0;
  margin-bottom: 2.5vh;
  padding: 1.5%;
  background-color: white;
  border-radius: 0.7rem;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints[1]}) {
    width: 100%;
    min-width: 100%;
    box-shadow: none;
    border-radius: 0px;
  }
`

export default QuestionPageContentWrapper
