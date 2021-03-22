const questionsRouter = require('express').Router()
const { Category, Question, Question_answer } = require('../models')

questionsRouter.get('/:surveyId', async (req, res) => {
  const { surveyId } = req.params
  try {
    const questions = await Question.findAll({
      include: [
        { model: Category, attributes: ['id', 'name'] },
        { model: Question_answer, attributes: ['id', 'text']}
      ],
      where: {
        surveyId: surveyId
      }
    })
    return res.json(questions)
  } catch (e) {
    console.log(e)
    return res.status(500).json({ error: 'Unable to fetch questions' })
  }
})



module.exports = questionsRouter
