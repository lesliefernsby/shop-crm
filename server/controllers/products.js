const express = require('express');

const router = express.Router();
const productService = require('../service/product');

const authorize = require('../helpers/authorize');

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

function fetchUserLikeIds(req, res, next) {
  productService
    .fetchUserLikeIds(req.params.userId)
    .then(options => res.json(options))
    .catch(err => next(err));
}

function toggleLike(req, res, next) {
  const currentUserId = req.user?.sub;
  productService
    .toggleLike(req.body.productId, currentUserId)
    .then(options => res.json(options))
    .catch(err => next(err));
}

router.post('/', getProductsByPage);
router.get('/categoriesOptions', getCategoriesOptions);
router.get('/likes/:userId', fetchUserLikeIds);
router.post('/like',  authorize(), toggleLike);
module.exports = router;
