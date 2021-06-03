/*
  util to count the number of answered questions
*/
export const countOfAnsweredQuestions = (selections) =>
  selections.reduce(
    // FIXME no reduce needed
    (accumulator, selection) =>
      selection.answerId !== undefined ? accumulator + 1 : accumulator,
    0
  )

/*
  util to check whether all selections are made (not undefined)
  in a given selections array
*/
export const allQuestionsAnswered = (selections) =>
  countOfAnsweredQuestions(selections) === selections.length
