/* eslint-disable strict */
/* eslint-disable no-unused-vars */

'use strict';

const { getMockedProducts } = require('../../mockedProducts');

module.exports = {
  async up(queryInterface, Sequelize) {
    const products = await getMockedProducts();
    await queryInterface.bulkInsert('Products', products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};
