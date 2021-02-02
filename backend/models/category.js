const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate( models ) {
      // define association here
      this.hasMany(models.Question, { foreignKey: 'categoryId' });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Category.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Category must have a name' },
        notEmpty: { msg: 'Category name can\'t be empty' },
      },
    },
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
