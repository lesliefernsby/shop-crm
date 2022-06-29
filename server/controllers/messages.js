const express = require('express');

const router = express.Router();
const authorize = require('../helpers/authorize');
const Role = require('../helpers/role');
const messagesService = require('../service/message')

function getChats(req, res, next) {
  messagesService
    .getUserChats()
    .then(chats => res.json(chats))
    .catch(err => next(err));
}

function getMessages(req, res, next) {
  const currentUser = req.user;
  const id = parseInt(req.params.id, 10);

  // only allow admins to access other user records
  if (id !== currentUser.sub && !currentUser.roles.includes(Role.Admin)) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  messagesService
    .getChatMessages(req.params.id)
    .then(chats => res.json(chats))
    .catch(err => next(err));

}


// admin only
router.get('/chats/', authorize(Role.Admin), getChats);

// auth
router.get('/:id', authorize(), getMessages);

module.exports = router;
