import React from 'react'
import styled from 'styled-components'
import { Button as MUIButton } from '@material-ui/core'

const ButtonWrapper = styled.div`
  .MuiButtonBase-root {
    background-color: ${({ theme }) => theme.colors.blueDianne};
    color: white;

    &:hover {
      background-color: ${({ theme }) => theme.colors.easternBlue};
    }

    font-family: Montserrat;
    font-weight: bold;
    font-size: 14px;
    text-decoration: none;
    border-radius: 5px;
    border-width: 0px;
    margin-top: 40px;
    min-width: 120px;
    line-height: 45px;
    padding-left: 10px;
    padding-right: 10px;
    text-transform: capitalize;

    cursor: pointer;

    .MuiTouchRipple-root {
      display: none;
    }
  }
`
const Button = ({ children, type, onClick }) => {
  if (type === 'button') {
    return (
      <ButtonWrapper>
        <MUIButton onClick={onClick} type="button">
          {children}
        </MUIButton>
      </ButtonWrapper>
    )
  }

  if (type === 'submit') {
    return (
      <ButtonWrapper>
        <MUIButton onClick={onClick} type="submit">
          {children}
        </MUIButton>
      </ButtonWrapper>
    )
  }

  console.warn('custom button only has button and submit types')
  return <></>
}

export default Button
