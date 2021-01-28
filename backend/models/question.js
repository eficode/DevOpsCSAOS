const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category }) {
      // define association here
      Question.belongsTo(Category, { foreingKey: 'CategoryId' });
    }
  }
  Question.init({
    text: DataTypes.STRING,
    weight: DataTypes.FLOAT,
    CategoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};
