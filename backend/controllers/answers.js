/* eslint-disable prettier/prettier */
const answersRouter = require('express').Router()
const { User, User_answer, Survey } = require('../models')

const { verifyUserAnswers, deleteUserSurveyAnswers, getResults } = require('./helpers/answers')

answersRouter.post('/', async (req, res) => {
  const { email, userAnswers, surveyId } = req.body
  
  const survey = await Survey.findAll({
    where: { id: surveyId }
  })

  if(!survey) {
    return res.status(500).json("SurveyId is invalid")
  }

  const verificationResult = await verifyUserAnswers(userAnswers, surveyId)

  if(verificationResult.unAnsweredQuestions.length > 0) {

    return res.status(500).json({
      message: "Some questions don't have answers",
      questions: verificationResult.unAnsweredQuestions
    })
  }

  if(verificationResult.duplicates.length > 0) {

    return res.status(500).json({
      message: "Some questions are answered more than once",
      questions: verificationResult.duplicates
    })
  }

  const results = await getResults(surveyId, userAnswers)

  try {
    if (email) {
      let userId
      const existingUser = await User.findOne({
        where: { email },
      })

      if (existingUser) {
        userId = existingUser.id
      } else {
        
        const user = await User.create({ email })
        userId = user.id
      }

      const answersToQuestions = userAnswers.map((answer) => ({
        userId: userId,
        questionAnswerId: answer,
      }))    

      if (existingUser) {
        await deleteUserSurveyAnswers(surveyId, userId)
      }
      
      await User_answer.bulkCreate(answersToQuestions)      
    }
    
    return res.status(200).json({ results: results })
  } catch (err) {
    return res.status(500).json(err)
  }
})

module.exports = answersRouter
