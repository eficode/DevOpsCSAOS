/* eslint-disable no-undef */
import create from 'zustand'
import { persist } from 'zustand/middleware'
import chunk from 'lodash/chunk'

const initialQuestions = []
const initialSelections = []
const initialEmail = ''
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
const initialFeatureToggleSwitch = 'A'

export const divideQuestions = (questions, featureToggleSwitch) => {
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
  // let chunkedQuestions = [chunk(questions, questions.length / 2)]

  let chunkedQuestions = []

  if (featureToggleSwitch === 'A') {
    // All questions divided to 2 pages
    chunkedQuestions = chunk(questions, (questions.length / 2) + 1)
  } else if (featureToggleSwitch === 'B') {
    // 1 question per page
    chunkedQuestions = chunk(questions, 1)
  }

  return { initialSelectionsWithQuestionIds, chunkedQuestions }
}

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
  featureToggleSwitch: initialFeatureToggleSwitch,
  setEmail: (email) => set(() => ({ email })),
  setSelections: (selections) => set(() => ({ selections })),
  setQuestions: (questions, featureToggleSwitch) => {
    const {
      initialSelectionsWithQuestionIds,
      chunkedQuestions,
    } = divideQuestions(questions, featureToggleSwitch)

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
    featureToggleSwitch: 'A',
  })),
  resetVersion: () => set(() => ({
    featureToggleSwitch: 'A',
    questions: [],
    questionGroups: [],
  })),
  setResultsPerCategory: (results) => set(() => ({ resultsPerCategory: results })),
  setResultText: (text) => set(() => ({ resultText: text })),
  setUserResult: (score) => set(() => ({ userResult: score })),
  setMaxResult: (score) => set(() => ({ maxResult: score })),
  setVisitedSummary: (value) => set(() => ({ visitedSummary: value })),
  setFeatureToggleSwitch: (value) => set(() => ({ featureToggleSwitch: value })),
})

export const useStore = create(
  persist(store, {
    name: 'devops assessment tool store',
    getStorage: () => sessionStorage,
  }),
)
