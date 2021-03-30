const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User_answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Question_answer }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId' })
      this.belongsTo(Question_answer, { foreignKey: 'questionAnswerId' })
    }
  }
  User_answer.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'User answer must have UserId' },
          notEmpty: { msg: "User answer UserId can't be empty" },
        },
      },
      questionAnswerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'User answer must have questionAnswerId' },
          notEmpty: { msg: "User questionAnswerId can't be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: 'User_answer',
    }
  )
  return User_answer
}
