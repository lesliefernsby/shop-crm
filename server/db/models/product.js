'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, {
        foreignKey: 'categoryId',
      });
      this.belongsToMany(models.Order, { through: 'OrderProducts', foreignKey: 'orderId' });
    }
  }
  Product.init({
    title: DataTypes.STRING, 
    image: DataTypes.STRING,
    description: DataTypes.TEXT,
    weight: DataTypes.FLOAT,
    price: DataTypes.FLOAT,
    categoryId: {
      type:DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
