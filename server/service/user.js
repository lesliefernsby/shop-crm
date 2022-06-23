/* eslint-disable no-param-reassign */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const config = require('../config.json');
const { User } = require('../db/models');

const saltRounds = 10;

async function authenticate({ username, password }) {

  const user = await User.findOne({
    where: {
      [Op.or]: [{ username }, { email: username }],
    },
    raw: true,
  });

  const pass = await bcrypt.compare(password, user.password);

  if (user && pass) {
    const token = jwt.sign(
      {
        sub: user.id,
        roles: user.roles,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      config.secret
    );
    return {
      token,
    };
  }
  return null;
}

async function getAll() {
  const users = await User.findAll({ raw: true });
  return users.map(user => {
    const { password, createdAt, updatedAt, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
}

async function getById(id) {
  const user = await User.findOne({
    where: {
      id,
    },
    raw: true,
  });
  if (!user) return;
  const { password, createdAt, updatedAt, ...userWithoutPassword } = user;
  // eslint-disable-next-line consistent-return
  return userWithoutPassword;
}

async function register({
  username,
  password,
  firstName = '',
  lastName = '',
  email,
}) {
  email = email || username;
  const plainTextPassword = password;
  password = await bcrypt.hash(plainTextPassword, saltRounds);
  const roles = ['User'];
  await User.create({
    username,
    email,
    password,
    firstName,
    lastName,
    roles,
  });

  return authenticate({ username, password: plainTextPassword });
}

module.exports = {
  authenticate,
  getAll,
  getById,
  register,
};
