/*
  util to count the number of answered questions
*/
export const countOfAnsweredQuestions = (selections) =>
  selections.filter(({ answerId }) => answerId !== undefined).length

/*
  util to check whether all selections are made (not undefined)
  in a given selections array
*/
export const allQuestionsAnswered = (selections) =>
  countOfAnsweredQuestions(selections) === selections.length
