import chunk from 'lodash/chunk'
import { questions } from './testdata'

export const initializedSelections = questions.map((q) => ({
  questionId: q.id,
  answerId: undefined,
}))

export const initializedQuestionGroups = chunk(
  questions,
  Math.round(questions.length / 3)
)

/*
  util for manipulating test selection array.
  give param as array of length 4 containing selections
  returns selections array.
*/
export const changeSelections = (newSelections) => {
  let i = -1
  return initializedSelections.map((s) => {
    i += 1
    return {
      ...s,
      answerId: newSelections[i],
    }
  })
}
