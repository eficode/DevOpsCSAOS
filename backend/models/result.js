const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  Result.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      lowestScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Result must have a lowest score' },
          notEmpty: { msg: "Result lowest score can't be empty" },
        },
      },
      highestScore: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Result must have a highest score' },
          notEmpty: { msg: "Result highest score can't be empty" },
        },
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: 'Result must have a text' },
          notEmpty: { msg: "Result text can't be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: 'Result',
    }
  )
  return Result
}
