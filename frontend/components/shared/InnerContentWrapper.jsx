import styled from 'styled-components'


export const InnerContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;
  width: 90%;
  max-height: 100%;
  /* min-height: 30rem; */
  margin: 0 4rem;
  padding: 7% 8%;
  background-color: white;
  border-radius: 0.5rem;
  /* flex: 1; */
  
  .MuiButtonBase-root{
    font-family: Montserrat;
    font-weight: bold;
    font-size: 14px;
    text-decoration: none;
    margin: 10px;
    min-width: 120px;
    height: 45px;
    text-align:center;
    line-height: 45px;
    border-radius: 5px;
    border-width: 0px;
    margin: 50px 25px 15px 25px;
    padding: 0 20px;
    text-transform: none;

    cursor:pointer;

    background-color: ${({ theme }) => theme.colors.blueDianne};
    color: white;

    &:hover {
      background-color: ${({ theme }) => theme.colors.easternBlue};
    }
  }

`
export default InnerContentWrapper
