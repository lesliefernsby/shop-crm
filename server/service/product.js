/* eslint-disable consistent-return */
const { Op } = require('sequelize');
const { Product, Category, User, Like } = require('../db/models');

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
    let result = await Like.findAll({ where: { userId }, raw: true });
    return result.map(( item ) => item.productId);
  } catch (error) {
    console.log(error);
  }
}

async function fetchLike(params) {
  try {
    console.log(params);
    let result = await Like.findOne({ where: { productId: params.id, userId: params.userId } });
    if (!result) {
      return await Like.create({ productId: params.id, userId: params.userId });
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
  fetchLike,
};
