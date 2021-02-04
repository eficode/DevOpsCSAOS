const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Answer }) {
      // define association here
      this.hasMany(Answer, { foreignKey: 'userId' })
    }
// eslint-disable-next-line prettier/prettier

    
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: 'User must have an email' },
          notEmpty: { msg: "Email can't be empty" },
          isEmail: { msg: 'Provided info must be a valid email address' },
        },
      },
      organizationId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
