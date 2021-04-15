/* eslint-disable camelcase */
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Survey_user_group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      this.belongsTo(models.Organization, { foreignKey: 'organizationId' })
      this.hasMany(models.User, { foreignKey: 'groupId' })
      this.belongsTo(models.Survey, { foreignKey: 'surveyId' })
    }
  }
  Survey_user_group.init(
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER,
        primaryKey: true,
      },
      group_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: { msg: "Survey user group name can't be empty" },
        },
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Url must be defined' },
          notEmpty: { msg: "Url can't be empty" },
        },
      },
      surveyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'Survey user group must have surveyId' },
          notEmpty: { msg: "Survey user group surveyId can't be empty" },
        },
      },
      organizationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Survey_user_group',
    }
  )
  return Survey_user_group
}
