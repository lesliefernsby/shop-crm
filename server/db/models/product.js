/* eslint-disable strict */
/* eslint-disable no-unused-vars */

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
      this.belongsToMany(models.User, { through: 'Likes', foreignKey: 'userId' });
      this.hasMany(models.OrderProduct, {
        foreignKey: 'productId',
      });
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
    },
    hide: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
