const questionsRouter = require('express').Router()
const { Category, Question, Question_answer } = require('../../models')

questionsRouter.get('/:surveyId', async (req, res) => {
  const { surveyId } = req.params
  try {
    const questions = await Question.findAll({
      attributes: { exclude: ['category_weights'] },
      include: [
        { model: Category, attributes: ['id', 'name', 'description'] },
        { model: Question_answer, attributes: ['id', 'text'] },
      ],
      where: {
        surveyId: surveyId,
      },
    })
    return res.status(200).json(questions)
  } catch (e) {
    return res.status(500).json({ error: 'Unable to fetch questions' })
  }
})

module.exports = questionsRouter
