/* eslint-disable no-unused-vars */



const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Message.init({
    senderId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    senderRole: DataTypes.STRING,
    senderName: DataTypes.STRING,
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};
