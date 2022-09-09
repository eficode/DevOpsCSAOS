const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Question_answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Question, User_answer }) {
      // define association here
      this.belongsTo(Question, { foreignKey: 'questionId' })
      // this.belongsToMany(Question, { through: 'QuestionAndAnswers' })
      this.hasMany(User_answer)
    }
  }
  Question_answer.init(
    {
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: 'Question answer must have text' },
          notEmpty: { msg: "Question answer text can't be empty" },
        },
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Question answer must have points' },
          notEmpty: { msg: "Question answer points can't be empty" },
        },
      },
      questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Question answer must have QuestionId' },
          notEmpty: { msg: "Question answer QuestionId can't be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: 'Question_answer',
    }
  )
  return Question_answer
}
