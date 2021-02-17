import create from 'zustand'
import { persist } from 'zustand/middleware'

/*
This is a general store for our local state
 */

const initialQuestions = []
const initialSelections = []
const initialEmail = ''
const initialResultsPerCategory = []
const optionsToPointsMap = {
  'Strongly agree': 5,
  Agree: 4,
  Neutral: 3,
  Disagree: 2,
  'Strongly disagree': 1,
}

/*
 * get: access state within actions
 */
const store = (set, _) => ({
  questions: initialQuestions,
  email: initialEmail,
  selections: initialSelections,
  resultsPerCategory: initialResultsPerCategory,
  optionsToPointsMap,
  setEmail: (email) => set(() => ({ email })),
  setSelections: (selections) => set(() => ({ selections })),
  setQuestions: (questions) => {
    set(() => ({
      questions,
    }))
  },
  clear: () =>
    set(() => ({
      questions: [],
      email: '',
      selections: [],
      resultsPerCategory: [],
    })),
  setResultsPerCategory: (results) =>
    set(() => ({ resultsPerCategory: results })),
})

// a callback function which returns an object
// describing state
// persist: persists our store in localStorage by default!
export const useStore = create(persist(store))
// storing the returned hook as useStore
