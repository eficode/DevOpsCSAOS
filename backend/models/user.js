const { Model } = require('sequelize')
const survey_user_group = require('./survey_user_group')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User_answer, Survey_user_group }) {
      // define association here
      this.hasMany(User_answer, { foreignKey: 'userId' })
      this.belongsTo(Survey_user_group, { foreignKey: 'groupId' })
    }
    // eslint-disable-next-line prettier/prettier
  }
  User.init(
    {
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
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
