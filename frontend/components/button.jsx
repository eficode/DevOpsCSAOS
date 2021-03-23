import React from 'react'
// import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import { Button as MUIButton } from '@material-ui/core'
import theme from '../styles/theme'

const StyledButton = withStyles({
  root: {
    backgroundColor: theme.colors.blueDianne,
    color: 'white',

    '&:hover': {
      backgroundColor: theme.colors.easternBlue,
    },

    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    fontSize: '14px',
    textDecoration: 'none',
    borderRadius: '5px',
    borderWidth: '0px',
    marginTop: '40px',
    minWidth: '120px',
    lineHeight: '45px',
    paddingLeft: '10px',
    paddingRight: '10px',
    textTransform: 'capitalize',

    cursor: 'pointer',

    '.MuiTouchRipple-root': {
      display: 'none',
    },
  },
})(MUIButton)

/* const ButtonWrapper = styled.div`
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
` */
const Button = ({ children, type, onClick }) => {
  if (type === 'button') {
    return (
      // <ButtonWrapper>
      <StyledButton onClick={onClick} type="button">
        {children}
      </StyledButton>
      // </ButtonWrapper>
    )
  }

  if (type === 'submit') {
    return (
      // <ButtonWrapper>
      <StyledButton onClick={onClick} type="submit">
        {children}
      </StyledButton>
      // </ButtonWrapper>
    )
  }

  console.warn('custom button only has button and submit types')
  return <></>
}

export default Button
