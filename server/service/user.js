const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('../helpers/role');
const { User } = require('../db/models');
const bcrypt = require("bcrypt");
const Op = require('sequelize').Op;
const saltRounds = 10;

module.exports = {
    authenticate,
    getAll,
    getById
};

async function authenticate({ username, password }) {
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await User.findOne({ where : {
        [Op.or]: [
          { username: username },
          { email: username }
        ]
      }, raw: true});

    const pass = await bcrypt.compare(password, user.password)

    if (user && pass) {
        const token = jwt.sign({ sub: user.id, roles: user.roles, firstName: user.firstName, lastName: user.lastName }, config.secret);
        return {
          token
        };
    }
}

async function getAll() {
    const users = await User.findAll({ raw: true});
    return users.map(user => {
        const { password, createdAt, updatedAt, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });
}

async function getById(id) {
    const user = await User.findOne({ where : {
      id: id
    }, raw: true});
    if (!user) return;
    const { password, createdAt, updatedAt, ...userWithoutPassword } = user;
    return userWithoutPassword;
}
