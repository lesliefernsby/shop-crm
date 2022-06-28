const { fn, col, Op } = require('sequelize');
const { Message } = require('../db/models');

async function addMessage(senderId, receiverId, senderRole, senderName, text) {
  await Message.create({ senderId, receiverId, senderRole, senderName, text });
}

async function getUserChats() {
  const chats = await Message.findAll({
    attributes: [[fn('DISTINCT', col('senderId')), 'senderId']],
    raw: true,
  });
  return chats;
}

async function getChatMessages(senderId) {
  const messages = await Message.findAll({
    where: {
      [Op.or]: [
        { senderId },
        { [Op.and]: { senderRole: 'Admin', receiverId: senderId } },
      ],
    },
    raw: true,
  });

  return messages;
}

module.exports = {
  addMessage,
  getUserChats,
  getChatMessages,
};
