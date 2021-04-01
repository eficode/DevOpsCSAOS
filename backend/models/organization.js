const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      this.hasMany(models.Survey_user_group, { foreignKey: 'organizationId' })
    }
  }
  Organization.init(
    {
      id: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Organization must have a name' },
          notEmpty: { msg: "Organization name can't be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: 'Organization',
    }
  )
  return Organization
}
