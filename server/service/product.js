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
async function getProductsByPage(query) {
  try {
    console.log(query);

    const { q, page, filters } = query;
    const perPage = query.perPage || 15;
    // const q = query.q.toLowerCase();

    let categoryArray = filters?.categories || [];

    categoryArray = categoryArray.map(item => ({ categoryId: item }));
    let products = [];
    if (categoryArray.length > 0) {
      products = await Product.findAll({
        where: {
          [Op.and]: [
            {
              hidden: false
            },
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
    return result.map((item) => item.productId);
  } catch (error) {
    console.log(error);
  }
}

async function toggleLike(productId, userId) {
  try {
    const result = await Like.findOne({ where: { productId, userId } });
    if (!result) {
      return await Like.create({ productId, userId });
    }
    return await result.destroy();
  } catch (error) {
    console.log(error);
  }
}

async function getFavorites(userId) {
  try {
    const userLikes =  await Like.findAll({ where: { userId } });
    return await Promise.all(userLikes.map(async (like) => await Product.findOne({where: {id: like.productId}})));
  } catch (error) {
    console.log(error);
  }
}

async function deleteProduct(id) {
  try {
    const productToDelete = await Product.findOne({ where: { id } });
    await productToDelete.destroy();
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProductsByPage,
  getCategoriesOptions,
  fetchUserLikeIds,
  toggleLike,
  getFavorites,
  deleteProduct,
};
