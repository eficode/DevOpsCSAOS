/* eslint-disable no-undef */
import create from 'zustand'
import { persist } from 'zustand/middleware'

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
const initialResultText = ''
const initialUserResult = 0
const initialMaxResult = 0

/*
  selections: array of length 0 to survey length
  contains empty or undefined if question unanswered

  (store is updated both through setSelections etc and
    store.setState not using setter functions -> 0 or
    -1 representing no selection is harder to implement
    + unnecessary as undef does the same job)
*/

const store = (set, _) => ({
  questions: initialQuestions,
  email: initialEmail,
  selections: initialSelections,
  resultsPerCategory: initialResultsPerCategory,
  optionsToPointsMap,
  resultText: initialResultText,
  userResult: initialUserResult,
  maxResult: initialMaxResult,
  setEmail: (email) => set(() => ({ email })),
  setSelections: (selections) => set(() => ({ selections })),
  setQuestions: (questions) => {
    set(() => ({
      questions,
    }))
  },
  clear: () => set(() => ({
    questions: [], email: '', selections: [], resultsPerCategory: [], resultText: '',
  })),
  setResultsPerCategory: (results) => set(() => ({ resultsPerCategory: results })),
  setResultText: (text) => set(() => ({ resultText: text })),
  setUserResult: (score) => set(() => ({ userResult: score })),
  setMaxResult: (score) => set(() => ({ maxResult: score })),
})

export const useStore = create(persist(store,
  {
    name: 'devops assessment tool store',
    getStorage: () => sessionStorage, // use sessionStorage
  }))
