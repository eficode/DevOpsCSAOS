import React from 'react'
import styled from 'styled-components'
import LinearProgress from '@material-ui/core/LinearProgress'
import theme from '../styles/theme'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFD700',
    },
  },
})

const BarBackground = styled.section`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blueDianne};
  height: 2.5rem;
  border-radius: 0.8rem;
  margin-bottom: -1rem;
  box-shadow: 0px 0px 10px #888888;
  z-index: 2;
  width: 95%;
`

const ProgressLine = styled(LinearProgress)`
  background-color: ${({ theme }) => theme.colors.brandyPunch};
  height: 0.3rem;
  border-radius: 0.2rem;
  height: 0.3rem;
  width: 90%;
  margin-left: 5%;
`

/*
  USAGE:
  - show progress: insert id and total props
  - bar component without progress (non-survey pages): leave props undefined
*/

export const ProgressBar = ({ answered, total }) => {
  if (!answered && !total) {
    answered = 0
    total = 100
  }

  const progress = (answered / total) * 100

  return (
    <>
      <BarBackground>
        <MuiThemeProvider theme={MuiTheme}>
          <ProgressLine
            variant="determinate"
            color="primary"
            value={progress}
            title="Survey progress"
          />
        </MuiThemeProvider>
      </BarBackground>
    </>
  )
}

export default ProgressBar
