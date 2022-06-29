const express = require('express');
const path = require('path');

const router = express.Router();
const productService = require('../service/product');
const Role = require('../helpers/role');

const authorize = require('../helpers/authorize');

function getProductsByPage(req, res, next) {
  productService
    .getProductsByPage({ q: req.query.q, page: Number(req.query.page), perPage: Number(req.query.perPage), filters: JSON.parse(req.query.filters) })
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

function getFavorites(req, res, next) {
  const currentUserId = req.user?.sub;
  productService
    .getFavorites(currentUserId)
    .then(options => res.json(options))
    .catch(err => next(err));
}

function toggleHideStatus(req, res, next) {
  productService
    .toggleHideStatus(req.body.id)
    .then((product) => res.json({ product }))
    .catch(err => next(err));
}


// eslint-disable-next-line consistent-return
function createNewProduct(req, res, next) {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: 'No files were uploaded.' });
    }
    const productImageURL = req.files.file;
    const uploadPath = path.resolve('public/img', productImageURL.name);
    const data = JSON.parse(req.body.document)
    data.url = `/img/${productImageURL.name}`;

    productImageURL.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).json({ err });
      }
      return '';
    });
    productService
      .createNewProduct(data)
      .then((product) => res.json(product))
      .catch((error) => next(error));
  } catch (e) {
    res.status(500).json(e);
  }

}

// eslint-disable-next-line consistent-return
function editProduct(req, res, next) {
  try {
    // if (!req.files || Object.keys(req.files).length === 0) {
    //   return res.status(400).json({ msg: 'No files were uploaded.' });
    // }
    if (req.files) {
      const productImageURL = req.files.file;
      const uploadPath = path.resolve('public/img', productImageURL.name);
      const data = JSON.parse(req.body.document)
      data.url = `/img/${productImageURL.name}`;

      productImageURL.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).json({ err });
        }
        return '';
      });
      productService
        .editProduct(data)
        .then((product) => res.json(product))
        .catch((error) => next(error));
    } else {
      const data = JSON.parse(req.body.document)
      productService
        .editProduct(data)
        .then((product) => res.json(product))
        .catch((error) => next(error));
    }
  } catch (e) {
    res.status(500).json(e);
  }

}

router.get('/', getProductsByPage);
router.get('/categoriesOptions', getCategoriesOptions);
router.post('/like', authorize(), toggleLike);
router.get('/likes/:userId', fetchUserLikeIds);
router.get('/favorites', authorize(), getFavorites);
router.post('/toggleHideStatus', authorize(Role.Admin), toggleHideStatus);
router.post('/create', authorize(Role.Admin), createNewProduct);
router.post('/edit', authorize(Role.Admin), editProduct);
module.exports = router;
