/* eslint-disable strict */
/* eslint-disable no-unused-vars */

'use strict';

const bcrypt = require("bcrypt");

const saltRounds = 10;

const { User } = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {

    let plainTextPassword1 = 'admin';
    let hash = await bcrypt.hash(plainTextPassword1, saltRounds);

    await User.create({
          username: 'admin',
          password: hash,
          firstName: 'Admin',
          lastName: 'Doe',
          email: 'admin@admin.com',
          roles: ['Admin', 'User'],
          createdAt: new Date(),
          updatedAt: new Date()
        });

    plainTextPassword1 = 'user';
    hash = await bcrypt.hash(plainTextPassword1, saltRounds);
      
    await User.create({
      username: 'user',
      password: hash,
      firstName: 'User',
      lastName: 'Roe',
      email: 'user@user.com',
      roles: ['User'],
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.bulkDelete('Users', null, {});
    
  }
};
