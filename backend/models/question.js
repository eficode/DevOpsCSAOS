const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, Answer }) {
      // define association here
      this.belongsTo(Category, { foreignKey: 'categoryId' })
      this.hasMany(Answer, { foreignKey: 'questionId' })
    }
  }
  Question.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Question must have text' },
          notEmpty: { msg: "Question text can't be empty" },
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Question must have weight for scoring' },
          notEmpty: { msg: "Question scoring can't be empty" },
        },
      },
      correctAnswer: {
        type: DataTypes.ENUM('agree', 'disagree'),
        defaultValue: 'agree',
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: { msg: 'Question must have categoryId' },
          notEmpty: { msg: "Question categoryId can't be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: 'Question',
    }
  )
  return Question
}