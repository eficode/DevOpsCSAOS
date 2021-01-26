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
    static associate() {
      // define association here
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Answer.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      first: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      second: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      third: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'answers',
      modelName: 'Answer',
    },
  );
  return Answer;
};
