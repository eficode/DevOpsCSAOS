const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Category_result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate( { Category }) {
      // define association here
      this.belongsTo(Category, { foreignKey: 'id'} )
    }
  }
  Category_result.init(
    {
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      text: {
        type: DataTypes.STRING,
        allowNull: true,
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
      modelName: 'Category_result',
    }
  )
  return Category_result
}