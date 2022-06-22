const { Product, Category } = require('../db/models');
const Op = require('sequelize').Op;

module.exports = {
  getProductsByPage,
  getCategoriesOptions
};
async function getCategoriesOptions() {
  try {
    return await Category.findAll({raw: true});
  } catch (error) {
    console.log(error);
  }
}
async function getProductsByPage(body) {
  try {
    const { page, filters } = body;
    const perPage = body.perPage || 15;
    const q = body.q.toLowerCase();

    let categoryArray = filters?.categories || [];

    categoryArray = categoryArray.map((item) => {
      return { categoryId: item }
    })
    let products = [];
    if (categoryArray.length > 0) {
      products = await Product.findAll({
        where: {
          [Op.and]: [
            {
              [Op.or]: categoryArray
            },
            , {
              [Op.or]: [
                {
                  title: {
                    [Op.like]: '%' + q + '%'
                  },
                },
                {
                  description: {
                    [Op.like]: '%' + q + '%'
                  },
                }
              ]
            }
          ]
        }, raw: true
      });
      
    } else {
      products = await Product.findAll({
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: '%' + q + '%'
              },
            },
            {
              description: {
                [Op.like]: '%' + q + '%'
              },
            }
          ]
        }, raw: true
      });


    }
    return products.slice((page - 1) * perPage, page * perPage);
     
  } catch (error) {
    console.log(error);
  }

}
