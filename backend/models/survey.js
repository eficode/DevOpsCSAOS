const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Question, Survey_result, Survey_user_group }) {
      // define association here
      this.hasMany(Question, { foreignKey: 'surveyId' })
      this.hasMany(Survey_result, { foreignKey: 'surveyId' })
      this.hasMany(Survey_user_group, { foreignKey: 'surveyId' })
    }
    // eslint-disable-next-line prettier/prettier
  }
  Survey.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      title_text: {
        type: DataTypes.TEXT,
      },
      survey_text: {
        type: DataTypes.TEXT,
      },
      survey_config: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Survey',
    }
  )
  return Survey
}
