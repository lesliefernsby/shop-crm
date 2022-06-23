const express = require('express');

const router = express.Router();
const productService = require('../service/product');

function getProductsByPage(req, res, next) {
  productService
    .getProductsByPage(req.body)
    .then(products => res.json(products))
    .catch(err => next(err));
}

function getCategoriesOptions(req, res, next) {
  productService
    .getCategoriesOptions()
    .then(options => res.json(options))
    .catch(err => next(err));
}

router.post('/', getProductsByPage);
router.get('/categoriesOptions', getCategoriesOptions);
module.exports = router;
