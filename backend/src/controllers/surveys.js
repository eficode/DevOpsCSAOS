const surveysRouter = require('express').Router()
const { Survey } = require('../../models')

surveysRouter.get('/:surveyId', async (req, res) => {
  const { surveyId } = req.params
  try {
    const data = await Survey.findOne({
      where: {
        id: surveyId,
      },
    })
    return res.status(200).json(data)
  } catch (e) {
    return res.status(500).json({ error: 'Unable to fetch survey details' })
  }
})

module.exports = surveysRouter
