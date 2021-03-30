import React from 'react'
import styled from 'styled-components'
import LinearProgress from '@material-ui/core/LinearProgress'
import theme from '../styles/theme'

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

const InnerLine = styled.div`
  background-color: ${({ theme }) => theme.colors.brandyPunch};
  height: 0.3rem;
  border-radius: 0.2rem;
  width: 90%;
  margin-left: 5%;
`

const ProgressLine = styled(LinearProgress)`
  background-color: ${({ theme }) => theme.colors.gold};
  height: 0.3rem;
  border-radius: 0.1rem;
  width: ${({ progress }) => progress}%;
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
        <InnerLine>
          <ProgressLine
            variant="determinate"
            value={progress}
            color={theme.colors.gold}
            progress={progress}
          />
        </InnerLine>
      </BarBackground>
    </>
  )
}

export default ProgressBar
