const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Industry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.hasMany(User, { foreignKey: 'industryId' })
    }
    // eslint-disable-next-line prettier/prettier
  }
  Industry.init(
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false,
        validate: {
          notNull: { msg: 'Industry must have a name' },
          notEmpty: { msg: "Industry name can't be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: 'Industry',
    }
  )
  return Industry
}
