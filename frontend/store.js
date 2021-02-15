import create from 'zustand'
import _ from 'lodash'

/*
This is a general store for our local state
 */

// TODO: remove hard coded values once store is able to persist data!
const initialQuestions = [
  {
    id: 'a4d65e0b-b2c3-426d-91f3-86c2e92bcfcb',
    text: 'Oletko ruisleipä?',
    weight: 0.8,
    categoryId: 'ece8e9d0-653b-11eb-ae93-0242ac130002',
    createdAt: '2021-02-10T16:17:03.478Z',
    updatedAt: '2021-02-10T16:17:03.478Z',
    Category: {
      name: 'Jauhot',
    },
  },
  {
    id: 'dbfd2098-f95b-4d82-946a-c8c0dcf10423',
    text: 'Oletko kauraleipä?',
    weight: 0.5,
    categoryId: 'ece8e9d0-653b-11eb-ae93-0242ac130002',
    createdAt: '2021-02-10T16:17:03.478Z',
    updatedAt: '2021-02-10T16:17:03.478Z',
    Category: {
      name: 'Jauhot',
    },
  },
  {
    id: '1675ec77-5a78-4318-a414-2545d9f068e3',
    text: 'Pullaleipä on parasta?',
    weight: 0.8,
    categoryId: 'faf6a13e-66d5-11eb-ae93-0242ac130002',
    createdAt: '2021-02-10T16:17:03.478Z',
    updatedAt: '2021-02-10T16:17:03.478Z',
    Category: {
      name: 'Tuote',
    },
  },
  {
    id: 'deea43fc-06ba-4aed-bc0d-fea0991aa05f',
    text: 'Täyshyväleipä on parasta?',
    weight: 0.5,
    categoryId: 'faf6a13e-66d5-11eb-ae93-0242ac130002',
    createdAt: '2021-02-10T16:17:03.478Z',
    updatedAt: '2021-02-10T16:17:03.478Z',
    Category: {
      name: 'Tuote',
    },
  },
  {
    id: 'faf69b1c-66d5-11eb-ae93-0242ac130002',
    text: 'Lehmänmaito on parasta?',
    weight: 0.1,
    categoryId: 'faf6a1fc-66d5-11eb-ae93-0242ac130002',
    createdAt: '2021-02-10T16:17:03.478Z',
    updatedAt: '2021-02-10T16:17:03.478Z',
    Category: {
      name: 'Maidot',
    },
  },
  {
    id: 'f9f3e2b1-3ed3-46df-8c9c-4cef635697fa',
    text: 'Maitokaakao on parasta?',
    weight: 0.2,
    categoryId: 'faf6a1fc-66d5-11eb-ae93-0242ac130002',
    createdAt: '2021-02-10T16:17:03.478Z',
    updatedAt: '2021-02-10T16:17:03.478Z',
    Category: {
      name: 'Maidot',
    },
  },
  {
    id: '59431e74-0ae6-4def-a87b-4fae82514187',
    text: 'Kauramaito on parasta?',
    weight: 0.4,
    categoryId: 'faf6a1fc-66d5-11eb-ae93-0242ac130002',
    createdAt: '2021-02-10T16:17:03.478Z',
    updatedAt: '2021-02-10T16:17:03.478Z',
    Category: {
      name: 'Maidot',
    },
  },
  {
    id: '6eb134f0-65fa-44bc-baad-14f0eeb0d743',
    text: 'Oletko kaurakeksi?',
    weight: 0.5,
    categoryId: 'faf6a4ae-66d5-11eb-ae93-0242ac130002',
    createdAt: '2021-02-10T16:17:03.478Z',
    updatedAt: '2021-02-10T16:17:03.478Z',
    Category: {
      name: 'Keksit',
    },
  },
  {
    id: '7da6e20b-53e7-4efa-92d3-ef88f0ec1169',
    text: 'Oletko täytekeksi?',
    weight: 0.5,
    categoryId: 'faf6a4ae-66d5-11eb-ae93-0242ac130002',
    createdAt: '2021-02-10T16:17:03.478Z',
    updatedAt: '2021-02-10T16:17:03.478Z',
    Category: {
      name: 'Keksit',
    },
  },
  {
    id: 'd254d70b-f26b-44f6-a48b-44b3435e0a26',
    text: 'Oletko suklaakeksi?',
    weight: 0.2,
    categoryId: 'faf6a4ae-66d5-11eb-ae93-0242ac130002',
    createdAt: '2021-02-10T16:17:03.478Z',
    updatedAt: '2021-02-10T16:17:03.478Z',
    Category: {
      name: 'Keksit',
    },
  },
]
const initialSelections = [1, 4, 1, 2, 3, 4, 3, 3, 5, 4]
const initialEmail = ''
const optionsToPointsMap = {
  'Strongly agree': 5,
  Agree: 4,
  Neutral: 3,
  Disagree: 2,
  'Strongly disagree': 1,
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
      existingQuestions.length > 0
      && !isArrayEqual(existingQuestions, questions)
    ) {
      get().setSelections(new Array(questions.length).fill(-1))
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
