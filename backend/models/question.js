const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Question.init({
    text: DataTypes.STRING,
    weight: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};
