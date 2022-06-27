/* eslint-disable consistent-return */
const { Op } = require('sequelize');
const { Product, Category, Like } = require('../db/models');

async function getCategoriesOptions() {
  try {
    return await Category.findAll({ raw: true });
  } catch (error) {
    console.log(error);
  }
}
async function getProductsByPage(body) {
  try {
    const { q, page, filters } = body;
    const perPage = body.perPage || 15;
    // const q = body.q.toLowerCase();

    let categoryArray = filters?.categories || [];

    categoryArray = categoryArray.map(item => ({ categoryId: item }));
    let products = [];
    if (categoryArray.length > 0) {
      products = await Product.findAll({
        where: {
          [Op.and]: [
            {
              [Op.or]: categoryArray,
            },

            {
              [Op.or]: [
                {
                  title: {
                    [Op.like]: `%${q}%`,
                  },
                },
                {
                  description: {
                    [Op.like]: `%${q}%`,
                  },
                },
              ],
            },
          ],
        },
        raw: true,
      });
    } else {
      products = await Product.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${q}%`,
              },
            },
            {
              description: {
                [Op.like]: `%${q}%`,
              },
            },
          ],
        },
        raw: true,
      });
    }
    return products.slice((page - 1) * perPage, page * perPage);
  } catch (error) {
    console.log(error);
  }
}

async function fetchUserLikeIds(userId) {
  try {
    const result = await Like.findAll({ where: { userId }, raw: true });
    return result.map(( item ) => item.productId);
  } catch (error) {
    console.log(error);
  }
}

async function toggleLike(productId, userId) {
  try {
    console.log(productId, userId, 'fkfdlfd');
    const result = await Like.findOne({ where: { productId, userId } });
    if (!result) {
      return await Like.create({ productId, userId });
    }
    return await result.destroy();
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProductsByPage,
  getCategoriesOptions,
  fetchUserLikeIds,
  toggleLike,
};
