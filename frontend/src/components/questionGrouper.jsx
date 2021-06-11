import React from 'react'
import SingleQuestion from './singleQuestion'

const QuestionGrouper = ({ questions, onOptionClick, answered, total }) => (
  <>
    {questions
      && questions.map((question) => (
        <SingleQuestion
          key={question.id}
          question={question}
          onOptionClick={onOptionClick}
          answered={answered}
          total={total}
        />
      ))}
  </>
)

export default QuestionGrouper
