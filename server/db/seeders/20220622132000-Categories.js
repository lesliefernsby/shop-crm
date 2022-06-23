/* eslint-disable strict */
/* eslint-disable no-unused-vars */

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        title: 'Fishing',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Cars',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Accessories',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Books',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Beverage',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
     
    ], {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Categories', null, {});

  }
};
