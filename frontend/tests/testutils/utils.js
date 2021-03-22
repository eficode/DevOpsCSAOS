import chunk from 'lodash/chunk'

export const questions = [
  {
    id: '0',
    text: 'Oletko ruisleipä?',
    weight: 0.8,
    categoryId: 1,
    createdAt: '2021-02-03T07:34:56.445Z',
    updatedAt: '2021-02-03T07:34:56.445Z',
    Category: { name: 'Jauhot' },
  },
  {
    id: '1',
    text: 'Maistuisiko laskiaispulla?',
    weight: 9.9,
    categoryId: 2,
    createdAt: '2021-02-03T07:34:56.445Z',
    updatedAt: '2021-02-03T07:34:56.445Z',
    Category: { name: 'Pullat' },
  },
  {
    id: '2',
    text: 'Olisiko jo perjantaipizzan aika?',
    weight: 9.9,
    categoryId: 2,
    createdAt: '2021-02-18T23:31:40.000Z',
    updatedAt: '2021-02-18T23:31:40.000Z',
    Category: { name: 'Perjantaifiilikset' },
  },
  {
    id: '3',
    text: 'Tykkäätkö korvapuustista?',
    weight: 7,
    categoryId: 2,
    createdAt: '2021-02-18T23:31:40.000Z',
    updatedAt: '2021-02-18T23:31:40.000Z',
    Category: { name: 'Pullat' },
  },
  {
    id: '4',
    text: 'Pidätkö höttöleivistä?',
    weight: 3,
    categoryId: 1,
    createdAt: '2021-02-18T23:31:40.000Z',
    updatedAt: '2021-02-18T23:31:40.000Z',
    Category: { name: 'Jauhot' },
  },
  {
    id: '5',
    text: 'Entäs paahdetusta?',
    weight: 7,
    categoryId: 1,
    createdAt: '2021-02-18T23:31:40.000Z',
    updatedAt: '2021-02-18T23:31:40.000Z',
    Category: { name: 'Jauhot' },
  },
]

export const initializedSelections = questions.map((q) => (
  {
    questionId: q.id,
    value: undefined,
  }
))

export const initializedQuestionGroups = chunk(questions, questions.length / 3)

/*
  util for manipulating test selection array.
  give param as array of length 4 containing selections
  returns selections array.
*/
export const changeSelections = (newSelections) => {
  let i = -1;
  return initializedSelections.map((s) => {
    i += 1
    return {
      ...s,
      value: newSelections[i],
    }
  })
}
