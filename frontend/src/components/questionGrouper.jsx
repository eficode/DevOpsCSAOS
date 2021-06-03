import React from 'react'
import SingleQuestion from './singleQuestion'

const QuestionGrouper = ({ questions, onOptionClick }) => (
  <>
    {questions
      && questions.map((question) => (
        <SingleQuestion
          key={question.id}
          question={question}
          onOptionClick={onOptionClick}
        />
      ))}
  </>
)

export default QuestionGrouper
