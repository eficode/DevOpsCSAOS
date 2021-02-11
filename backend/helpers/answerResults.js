const resultsPerCategory = async (categories, questions, answers) => {
  let results = categories.map((category) => ({
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    name: category.name,
    categoryId: category.id,
    userResult: 0,
    maxCategoryResult: 0,
  }))

  await answers.forEach((answer) => {
    const question = questions.find((quest) => quest.id === answer.questionId)
    const answerResult =
      question.correctAnswer === 'agree'
        ? question.weight * answer.value
        : question.weight * (4 - answer.value)

    results = results.map((result) => {
      if (result.categoryId === question.categoryId) {
        return {
          // eslint-disable-next-line node/no-unsupported-features/es-syntax
          ...result,
          userResult: result.userResult + answerResult,
          maxCategoryResult: result.maxCategoryResult + question.weight * 4,
        }
      }

      return result
    })
  })
  return results
}

module.exports = { resultsPerCategory }
