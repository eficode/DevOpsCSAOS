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
const initialSurveyId = 1
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
const initialSurveyHeader = 'Self-assessment tool'
const initialSurveyTitleText = 'Welcome to survey tool!'
const initialSurveyFlavorText = 'on your practices.'

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
  surveyId: initialSurveyId,
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
  titleText: initialSurveyTitleText,
  flavorText: initialSurveyFlavorText,
  surveyHeader: initialSurveyHeader,
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
  cleanStore: () =>
    set(() => ({
      questions: initialQuestions,
      selections: initialSelections,
      userSelectedIndustry: initialUserSelectedIndustry,
      userSelectedRole: initialUserSelectedRole,
      userSelectedChallenge: initialUserSelectedChallenge,
      surveyId: initialSurveyId,
      visitedSummary: false,
      groupId: '',
    })),
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
  setSurveyData: (data) => set(() => ({titleText: data.title_text,
    flavorText: data.survey_text, surveyHeader: data.name})),
  setDetailedResults: (detailedResults) => set(() => ({ detailedResults })),
  setVisitedSummary: (value) => set(() => ({ visitedSummary: value })),
  setFeatureToggleSwitch: (value) =>
    set(() => ({ featureToggleSwitch: value })),
  setGroupId: (value) => set(() => ({ groupId: value })),
  setUserToken: (value) => set(() => ({ userToken: value })),
  setIndustries: (industries) => set(() => ({ industries })),
  setSurvey: (surveyId) => set(() => ({ surveyId })),
  setUserQuestionAnswerPairs: (value) =>
    set(() => ({ userQuestionAnswerPairs: value })),
  setUserSelectedIndustry: (value) =>
    set(() => ({ userSelectedIndustry: value })),
  setUserSelectedRole: (value) => set(() => ({ userSelectedRole: value })),
  setUserSelectedChallenge: (value) =>
    set(() => ({ userSelectedChallenge: value })),
})

export const useStore = create(
  persist(store, {
    name: 'devops assessment tool store',
    getStorage: () => sessionStorage,
  })
)
