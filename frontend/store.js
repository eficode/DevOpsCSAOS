import create from 'zustand'
import _ from 'lodash'

/*
This is a general store for our local state
 */

const initialQuestions = []
const initialSelections = []
const initialEmail = ''
const optionsToPointsMap = {
  'Strongly agree': 5,
  Agree: 4,
  Neutral: 3,
  Disagree: 2,
  'Strongly agree': 1,
}

// deep shallow compares two arrays
const isArrayEqual = function (x, y) {
  return _(x).xorWith(y, _.isEqual).isEmpty()
}

/*
 * get: access state within actions
 */
const store = (set, get) => ({
  questions: initialQuestions,
  email: initialEmail,
  selections: initialSelections,
  optionsToPointsMap,
  setEmail: (email) => set(() => ({ email })),
  setSelections: (selections) => set(() => ({ selections })),
  setQuestions: (questions) => {
    const existingQuestions = get().questions
    // if questions have been set and the new ones differ from old ones
    if (
      existingQuestions.length > 0 &&
      !isArrayEqual(existingQuestions, questions)
    ) {
      get().setSelections(new Array(questions.length).fill(0))
    }
    // in all cases, update the questions
    set(() => ({
      questions,
    }))
  },
})
// a callback function which returns an object
// describing state
export const useStore = create(store)
// storing the returned hook as useStore
