const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Survey_result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( { Survey }) {
      // define association here
      this.belongsTo(Survey, { foreignKey: 'surveyId'} )
    }
  }
  Survey_result.init(
    {
      surveyId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cutoff_from_maxpoints: {
        type: DataTypes.FLOAT,
        validate: {
          max: 1,
          min: 0,
        },
      }
    },
    {
      sequelize,
      modelName: 'Survey_result',
    }
  )
  return Survey_result
}
