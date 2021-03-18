const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      this.hasMany(models.Question, { foreignKey: 'categoryId' })
      this.hasMany(models.Category_result, { foreignKey: 'id'})
    }
  }
  Category.init(
    {
      
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Category must have a name' },
          notEmpty: { msg: "Category name can't be empty" },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: { msg: 'Category must have a description' },
          notEmpty: { msg: "Category description can't be empty" },
        },
      },
    },
    {
      sequelize,
      modelName: 'Category',
    }
  )
  return Category
}
