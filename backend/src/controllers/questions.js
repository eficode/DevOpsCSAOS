const questionsRouter = require('express').Router()
const { Question, Question_answer } = require('../../models')

questionsRouter.get('/:surveyId', async (req, res) => {
  const { surveyId } = req.params
  try {
    const questions = await Question.findAll({
      attributes: { exclude: ['category_weights'] },
      include: [
        {
          model: Question_answer,
          attributes: ['id', 'text'],
          order: [['id', 'ASC']],
        },
      ],
      where: {
        surveyId: surveyId,
      },
      order: [['id', 'ASC']],
    })
    return res.status(200).json(questions)
  } catch (e) {
    return res.status(500).json({ error: 'Unable to fetch questions' })
  }
})

module.exports = questionsRouter
