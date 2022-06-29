const express = require('express');

const router = express.Router();
const userService = require('../service/user');
const authorize = require('../helpers/authorize');
const Role = require('../helpers/role');

function authenticate(req, res, next) {
  console.log(req.body);
  userService
    .authenticate(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res.status(400).json({ message: 'Username or password is incorrect' })
    )
    .catch(err => next(err));
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

// eslint-disable-next-line consistent-return
function getById(req, res, next) {
  const currentUser = req.user;
  const id = parseInt(req.params.id, 10);

  // only allow admins to access other user records
  if (id !== currentUser.sub && !currentUser.roles.includes(Role.Admin)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  userService
    .getById(id)
    .then(user => (user ? res.json(user) : res.sendStatus(404)))
    .catch(err => next(err));
}

function register(req, res, next) {
  userService
    .register(req.body)
    .then(user =>
      user
        ? res.json(user)
        : res.status(500).json({ message: 'Failed to create' })
    )
    .catch(err => next(err));
}

// routes
// public routes
router.post('/authenticate', authenticate);
router.post('/register', register);

// admin only
router.get('/', authorize(Role.Admin), getAll);

// all authenticated users
router.get('/:id', authorize(), getById);
module.exports = router;
