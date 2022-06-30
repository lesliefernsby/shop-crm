/* eslint-disable no-return-await */
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
    const { q, page, filters } = query;
    const perPage = query.perPage || 15;
    // const q = query.q.toLowerCase();
    let categoryArray = (filters?.categories) || [];

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

async function toggleHideStatus(id) {
  try {
     const product = await Product.findOne({ where: { id } });

     product.update(
      {
        hide: !product.hide,
      },
      {
        where: { id },
      }
    );
    return product;
  } catch (error) {
    console.log(error);
  }
}
async function createNewProduct(data) {
  try {    
    let category = await Category.findOne({where: {title: data.productCategoryTitle}});
    if (!category) {
      category = await Category.create({title: data.productCategoryTitle})
    }
    return await Product.create({title: data.productTitle, image: data.url, description: data.productDescription, weight: Number(data.weight), price: Number(data.price), categoryId: category.id, hide: false})
  } catch (error) {
    console.log(error);
  }
}

async function editProduct(data) {
  try {  
    const product = await Product.findOne({where: {id: data.id}});
    const prevCategoryId = product.categoryId; 
    let category = await Category.findOne({where: {title: data.productCategoryTitle}});
    if (!category) {
      category = await Category.create({title: data.productCategoryTitle})
    }
    let editedProduct;
    if (data.url) {
       editedProduct = await product.update({title: data.productTitle, image: data.url, description: data.productDescription, weight: Number(data.weight), price: Number(data.price), categoryId: category.id, hide: product.hide}, {where: {id: data.id}});
    } else {
       editedProduct = await product.update({title: data.productTitle,  description: data.productDescription, weight: Number(data.weight), price: Number(data.price), categoryId: category.id, hide: product.hide}, {where: {id: data.id}});
    }
    // если по старой категории нет товаров, удалить категорию
      const noProducts = await Product.findAll({where: {categoryId: prevCategoryId}});
      if (noProducts.length === 0) {
        const prevCategory = await Category.findOne({where: {id: prevCategoryId}});
        await prevCategory.destroy();
      }
      return editedProduct;
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
  toggleHideStatus,
  createNewProduct,
  editProduct
};
