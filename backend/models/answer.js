const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Question }) {
      // define association here
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Question, { foreignKey: 'questionId' });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Answer.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Answer must have UserId' },
        notEmpty: { msg: 'Answer UserId can\'t be empty' },
      },
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Answer must have QuestionId' },
        notEmpty: { msg: 'Answer QuestionId can\'t be empty' },
      },
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Answer must have a value' },
        notEmpty: { msg: 'Answer value can\'t be empty' },
      },
    },
  },
  {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};
