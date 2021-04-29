/* eslint-disable no-undef */
import create from 'zustand'
import { persist } from 'zustand/middleware'
import chunk from 'lodash/chunk'

const initialDetailedResults = {
  surveyResult: {
    maxPoints: 100,
    userPoints: 80,
    text: 'You did semi ok!',
    groupAverage: 99,
    industryAverage: 45,
  },
  categoryResults: [
    {
      name: 'COolNess',
      userPoints: 12,
      groupAverage: 15,
      industryAverage: 18,
      maxPoints: 20,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      name: 'Kiva',
      userPoints: 22,
      groupAverage: 15,
      industryAverage: 18,
      maxPoints: 25,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      name: 'Kova',
      userPoints: 8,
      maxPoints: 10,
      groupAverage: 5,
      industryAverage: 8,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      name: 'JEOUaujee',
      userPoints: 12,
      maxPoints: 40,
      groupAverage: 38,
      industryAverage: 8,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      name: 'Ihan siistiä!',
      userPoints: 15,
      maxPoints: 15,
      groupAverage: 15,
      industryAverage: 8,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ],
}

const initialQuestions = []
const initialSelections = []
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

export const divideQuestions = (questions, featureToggleSwitch) => {
  const initialSelectionsWithQuestionIds = []
  questions.forEach((q) => {
    initialSelectionsWithQuestionIds.push({
      questionId: q.id,
      answerId: undefined,
    })
  })

  let chunkedQuestions = []

  if (featureToggleSwitch === 'A') {
    // All questions divided to 2 pages, if uneven number of questions, first page gets +1 questions
    chunkedQuestions =
      questions.length % 2 === 0
        ? chunk(questions, questions.length / 2)
        : chunk(questions, questions.length / 2 + 1)
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
  optionsToPointsMap,
  results: initialResults,
  detailedResults: initialDetailedResults,
  visitedSummary: initialVisitedSummary,
  featureToggleSwitch: initialFeatureToggleSwitch,
  groupId: initialGroupId,
  userToken: initialToken,
  industries: initialIndustries,
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
    visitedSummary: false,
    featureToggleSwitch: 'A',
    groupId: '',
    industries: [],
  })),
  resetVersion: () => set(() => ({
    featureToggleSwitch: 'A',
    questions: [],
    questionGroups: [],
    visitedSummary: false,
    groupId: '',
  })),
  setResults: (results) => set(() => ({ results })),
  setVisitedSummary: (value) => set(() => ({ visitedSummary: value })),
  setFeatureToggleSwitch: (value) =>
    set(() => ({ featureToggleSwitch: value })),
  setGroupId: (value) => set(() => ({ groupId: value })),
  setUserToken: (value) => set(() => ({ userToken: value })),
  setIndustries: (industries) => set(() => ({ industries })),
})

export const useStore = create(
  persist(store, {
    name: 'devops assessment tool store',
    getStorage: () => sessionStorage,
  })
)
