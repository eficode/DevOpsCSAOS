import styled from 'styled-components'

/**
 * Don't change to a div! Will not work (unknown reason -.-). 
 * */
export const InnerContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;
  width: 90%;

  height: auto;
  min-height: 100%;
  min-height: 25rem;

  @media screen and (max-width: 800px) {
    min-height: 20;
  }

  @media screen and (max-width: 650px) {
    position: absolute;
    height: auto;
    min-height: 100%;
  }
  
  margin: 0;
  padding: 7% 8%;
  background-color: white;
  border-radius: 0.5rem;
`

export default InnerContentWrapper


/*
  
*/