/* eslint-disable no-undef */
import create from 'zustand'
import { persist } from 'zustand/middleware'
import chunk from 'lodash/chunk'

const initialDetailedResults = undefined

const initialQuestions = []
const initialSelections = []
const initialUserQuestionAnswerPairs = []
const initialEmail = ''
const optionsToPointsMap = {
  'Strongly agree': 4,
  Agree: 3,
  Neutral: 2,
  Disagree: 1,
  'Strongly disagree': 0,
}
const initialResults = undefined
const initialQuestionGroups = []
const initialVisitedSummary = false
const initialFeatureToggleSwitch = 'A'
const initialGroupId = ''
const initialToken = ''
const initialIndustries = []
const initialUserSelectedIndustry = ''
const initialUserSelectedRole = ''
const initialUserSelectedChallenge = ''


export const divideQuestions = (questions, featureToggleSwitch) => {
  const initialSelectionsWithQuestionIds = []
  questions.forEach((q) => {
    initialSelectionsWithQuestionIds.push({
      questionId: q.id,
      answerId: undefined,
    })
  })

  let chunkedQuestions = chunk(questions, 1)

  if (featureToggleSwitch === 'B') {
    // All questions divided to 2 pages, if uneven number of questions, first page gets +1 questions
    chunkedQuestions =
      questions.length % 2 === 0
        ? chunk(questions, questions.length / 2)
        : chunk(questions, questions.length / 2 + 1)
  }

  return { initialSelectionsWithQuestionIds, chunkedQuestions }
}

const store = (set) => ({
  questions: initialQuestions,
  userQuestionAnswerPairs: initialUserQuestionAnswerPairs,
  email: initialEmail,
  selections: initialSelections,
  questionGroups: initialQuestionGroups,
  optionsToPointsMap,
  results: initialResults,
  detailedResults: initialDetailedResults,
  visitedSummary: initialVisitedSummary,
  featureToggleSwitch: initialFeatureToggleSwitch,
  groupId: initialGroupId,
  userToken: initialToken,
  industries: initialIndustries,
  userSelectedIndustry: initialUserSelectedIndustry,
  userSelectedRole: initialUserSelectedRole,
  userSelectedChallenge: initialUserSelectedChallenge,
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
  clear: () =>
    set(() => ({
      questions: [],
      email: '',
      selections: [],
      resultsPerCategory: [],
      resultText: '',
      visitedSummary: false,
      featureToggleSwitch: 'A',
      groupId: '',
      industries: [],
    })),
  resetVersion: () =>
    set(() => ({
      featureToggleSwitch: 'A',
      questions: [],
      questionGroups: [],
      visitedSummary: false,
      groupId: '',
    })),
  setResults: (results) => set(() => ({ results })),
  setDetailedResults: (detailedResults) => set(() => ({ detailedResults })),
  setVisitedSummary: (value) => set(() => ({ visitedSummary: value })),
  setFeatureToggleSwitch: (value) =>
    set(() => ({ featureToggleSwitch: value })),
  setGroupId: (value) => set(() => ({ groupId: value })),
  setUserToken: (value) => set(() => ({ userToken: value })),
  setIndustries: (industries) => set(() => ({ industries })),
  setUserQuestionAnswerPairs: (value) => set(() => ({ userQuestionAnswerPairs: value })),
  setUserSelectedIndustry: (value) => set(() => ({userSelectedIndustry: value })),
  setUserSelectedRole: (value) => set(() => ({userSelectedRole: value })),
  setUserSelectedChallenge: (value) => set(() => ({userSelectedChallenge: value })),
})

export const useStore = create(
  persist(store, {
    name: 'devops assessment tool store',
    getStorage: () => sessionStorage,
  })
)
