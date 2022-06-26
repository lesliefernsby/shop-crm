

const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Delivery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Order, {
        foreignKey: 'orderId',
      });
    }
  }
  Delivery.init({
    type: DataTypes.STRING,
    date: DataTypes.DATE,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address1: DataTypes.STRING,
    address2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    country: DataTypes.STRING,
    comment: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    orderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Delivery',
  });
  return Delivery;
};
