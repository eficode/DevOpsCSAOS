import React from 'react'
import { useStore } from '../../../store'

const Summary = () => {
  const selections = useStore((state) => state.selections)
  const optionsToPointsMap = useStore((state) => state.optionsToPointsMap)
  const questions = useStore((state) => state.questions)
  console.log('💩 ~ file: summary.jsx ~ line 8 ~ questions', questions)

  console.log(
    '💩 ~ file: summary.jsx ~ line 7 ~ optionsToPointsMap',
    optionsToPointsMap
  )
  console.log('💩 ~ file: summary.jsx ~ line 6 ~ selections', selections)

  return <div>This is a summary of your answers</div>
}

export default Summary
