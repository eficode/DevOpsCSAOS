
const { User_answer, Question, Question_answer, Category, Survey_result,  sequelize } = require('../../models')
const user = require('../../models/user')
const Sequelize = require('sequelize')

const getResults = async (surveyId, user_answers) => {
    const bestAnswerPerQuestion = await Question_answer.findAll({
    attributes: [
      [sequelize.fn('max', sequelize.col('points')), 'points'],
    ],
    include : [
      {
        model : Question,
        where: {
          'surveyId': surveyId
        },
        include: [
          {
            model: Category,
            attributes: ['name', 'id'],
          }
        ],
      }
    ],
    group: ['Question.id', 'Question.Category.id'],
    raw: true,
    nest: true 
    
  })

  let categoryResults = []
  const surveyMaxResult = bestAnswerPerQuestion
      .reduce((accumulator, currentValue) => accumulator + currentValue.points, 0)

  bestAnswerPerQuestion.forEach(question => {
    
    const isCategoryInList = categoryResults.find(category => category.id === question.Question.Category.id)
    if(!isCategoryInList) {
      categoryResults.push({
        id: question.Question.Category.id,
        name: question.Question.Category.name,
        userPoints: 0,
        maxPoints: question.points
      })
      
    } else {
      categoryResults = categoryResults.map(category => category.id === question.Question.Category.id 
        ? {...category, maxPoints: category.maxPoints + question.points}
        : {...category}
      )

    }
  })

  const userAnswers = await Question_answer.findAll({
    attributes: [
      [sequelize.fn('sum', sequelize.col('points')), 'points'],
    ],
    include : [
      {
        model : Question,
        attributes: ['text', 'id'],
        include: [
          {
            model: Category,
          }
        ],
      }
    ],
    where: {
      id: user_answers
    },
    group: ['Question.Category.id', 'Question.id'],
    raw: true,
    nest: true
  })

  categoryResults.forEach(category => {
    const answersInCategory = userAnswers.filter(question => question.Question.Category.id === category.id)
    const sum = answersInCategory
      .reduce((accumulator, currentValue) => accumulator + Number(currentValue.points), 0)

    categoryResults = categoryResults.map(categ => categ.id === category.id 
        ? {...category, userPoints: sum}
        : {...category}
      )
  })

  const userSurveyResult = categoryResults
    .reduce((accumulator, currentValue) => accumulator + Number(currentValue.userPoints), 0)

  const pointsOutOfMax = userSurveyResult / surveyMaxResult

  const { Op } = Sequelize
  
  const surveyResult = await Survey_result.findOne({
      attributes: [
        'text',
        'surveyId',
        'cutoff_from_maxpoints'
      ],
      where: {
        cutoff_from_maxpoints: { [Op.gte]: pointsOutOfMax },
        surveyId: surveyId
      },
      order: [
        ['cutoff_from_maxpoints', 'ASC'],
      ],
      raw: true

  })




  let results = {
    surveyResult: {
      text: surveyResult.text,
      userPoints: userSurveyResult,
      maxPoints: surveyMaxResult
    },
    categoryResults: categoryResults
  }

  return { ...results }
}

const deleteUserSurveyAnswers = async (surveyId, userId) => {
    const allUserAnswers = await User_answer.findAll({
          attributes: ['id'],
          include : [
            {
              model : Question_answer,
              attributes: ['text', 'id'],
              include: [
                {
                  model: Question,
                  attributes: ['id', 'surveyId']
                }
              ],
            }
          ],
          where: {
            userId: userId,
          },
          raw: true,
          nest: true
    })

    let allUserSurveyAnswers = allUserAnswers
      .filter(user_answer => user_answer.Question_answer.Question.surveyId === surveyId)
        
    allUserSurveyAnswers = allUserSurveyAnswers.map(answer => answer.id)

    await User_answer.destroy({ where: { id: allUserSurveyAnswers }})
}



const verifyUserAnswers = async (user_answers, surveyId) => {

    const allSurveyQuestions = await Question.findAll({
        attributes: ['id', 'surveyId', 'text', 'categoryId'],
        where: { 
            surveyId: surveyId
        },
        raw: true,
        nest: true 
        
    })

    const userQuestionAnswers = await Question_answer.findAll({

        where: {
            id: user_answers
        },
        order: [
            ['questionId', 'ASC'],
        ],
        raw: true,
        nest: true
    })

    
    
    let duplicates = []

    for (let i = 0; i < userQuestionAnswers.length - 1; i++) {
        if (userQuestionAnswers[i + 1].questionId === userQuestionAnswers[i].questionId) {
          duplicates.push({
            questionId: userQuestionAnswers[i].questionId
          })
        }
    }
    

    
    const unAnsweredQuestions = allSurveyQuestions.filter(question => {
        let found = userQuestionAnswers.find(question_answer => question_answer.questionId === question.id)
        
        if(!found) {
            return true
        } else {
            return false
        }
    });

    return {
        unAnsweredQuestions,
        duplicates
    }
}

module.exports = { verifyUserAnswers, deleteUserSurveyAnswers, getResults }