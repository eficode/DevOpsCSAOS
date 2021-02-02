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

    toJSON() {
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      return { ...this.get(), id: undefined }
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'User must have an email' },
          notEmpty: { msg: "Email can't be empty" },
          isEmail: { msg: 'Provided info must be a valid email address' },
        },
      },
      organizationID: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )
  return User
}
