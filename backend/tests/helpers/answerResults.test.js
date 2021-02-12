/* eslint-disable no-undef */
const { resultsPerCategory } = require('../../helpers/answerResults')

const testCategories = [
  {
    id: 1,
    name: 'Jauhot',
  },
  {
    id: 2,
    name: 'Tuote',
  },
  {
    id: 3,
    name: 'TestiKategoria',
  },
]

const testQuestions = [
  {
    id: 100,
    text: 'Oletko ruisleipä?',
    weight: 1,
    categoryId: 1,
  },
  {
    id: 200,
    text: 'Oletko kauraleipä?',
    weight: 1,
    categoryId: 2,
  },
  {
    id: 300,
    text: 'Oletko pullaleipä?',
    weight: 1,
    categoryId: 3,
  },
]

const testAnswers = [
  {
    questionId: 100,
    value: 2,
  },
  {
    questionId: 200,
    value: 0,
    correctAnswer: 'disagree',
  },
  {
    questionId: 300,
    value: 4,
    correctAnswer: 'disagree',
  },
]

describe('resultsPerCategory', () => {
  it('Returns correct results', async (done) => {
    const testResult = await resultsPerCategory(
      testCategories,
      testQuestions,
      testAnswers
    )
    const category1 = testResult.find(
      (categoryResult) => categoryResult.categoryId === 1
    )
    const category2 = testResult.find(
      (categoryResult) => categoryResult.categoryId === 2
    )
    const category3 = testResult.find(
      (categoryResult) => categoryResult.categoryId === 3
    )
    expect(category1.userResult).toEqual(2)
    expect(category1.maxCategoryResult).toEqual(4)

    expect(category2.userResult).toEqual(4)
    expect(category2.maxCategoryResult).toEqual(4)

    expect(category3.userResult).toEqual(0)
    expect(category3.maxCategoryResult).toEqual(4)
    done()
  })
})
