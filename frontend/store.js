/* eslint-disable no-undef */
import create from 'zustand'
import { persist } from 'zustand/middleware'
import chunk from 'lodash/chunk'

const initialQuestions = []
const initialSelections = []
const initialEmail = 'this.is.a@placeholder.email'
const initialResultsPerCategory = []
const optionsToPointsMap = {
  'Strongly agree': 4,
  Agree: 3,
  Neutral: 2,
  Disagree: 1,
  'Strongly disagree': 0,
}
const initialResultText = ''
const initialUserResult = 0
const initialMaxResult = 0
const initialQuestionGroups = []
const initialVisitedSummary = false

const store = (set) => ({
  questions: initialQuestions,
  email: initialEmail,
  selections: initialSelections,
  questionGroups: initialQuestionGroups,
  resultsPerCategory: initialResultsPerCategory,
  optionsToPointsMap,
  resultText: initialResultText,
  userResult: initialUserResult,
  maxResult: initialMaxResult,
  visitedSummary: initialVisitedSummary,
  setEmail: (email) => set(() => ({ email })),
  setSelections: (selections) => set(() => ({ selections })),
  setQuestions: (questions) => {
    const initialSelectionsWithQuestionIds = []
    questions.forEach((q) => {
      initialSelectionsWithQuestionIds.push({
        questionId: q.id,
        answerId: undefined,
      })
    })

    /* question grouping on pages can be modified here.
      current (arbitrary) grouping logic: divide questions on 2
      equal-length (or n and n+1-question if odd number) pages.
    */
    const chunkedQuestions = chunk(questions, questions.length / 2)

    set(() => ({
      questions,
      selections: initialSelectionsWithQuestionIds,
      questionGroups: chunkedQuestions,
    }))
  },
  clear: () => set(() => ({
    questions: [],
    email: '',
    selections: [],
    resultsPerCategory: [],
    resultText: '',
  })),
  setResultsPerCategory: (results) => set(() => ({ resultsPerCategory: results })),
  setResultText: (text) => set(() => ({ resultText: text })),
  setUserResult: (score) => set(() => ({ userResult: score })),
  setMaxResult: (score) => set(() => ({ maxResult: score })),
  setVisitedSummary: (value) => set(() => ({ visitedSummary: value })),
})

export const useStore = create(
  persist(store, {
    name: 'devops assessment tool store',
    getStorage: () => sessionStorage,
  }),
)
