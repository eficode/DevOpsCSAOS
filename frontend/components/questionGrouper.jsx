import React from 'react'
import SingleQuestion from './singleQuestion'

const QuestionGrouper = ({ questions }) => (
  <>
    {questions.map((question) => (
      <>
        <SingleQuestion key={question.id} question={question} />
      </>
    ))}
  </>
)

export default QuestionGrouper
