const express = require('express');

const router = express.Router();
const authorize = require('../helpers/authorize');
const Role = require('../helpers/role');
const orderService = require('../service/order');

function getAll(req, res, next) {
  orderService
    .getAll()
    .then(orders => res.json(orders))
    .catch(err => next(err));
}

function getById(req, res, next) {
  const currentUser = req.user;
  const id = parseInt(req.params.id, 10);

  orderService
    .getById(id)
    .then(order => {
      if (
        !currentUser.roles.includes(Role.Admin) &&
        order.userId !== currentUser.sub
      ) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      return order ? res.json(order) : res.sendStatus(404);
    })
    .catch(err => next(err));
}

function getByUser(req, res, next) {
  const id = parseInt(req.params.id, 10);
  orderService
    .getByUser(id)
    .then(orders => orders ? res.json(orders) : res.sendStatus(404))
    .catch(err => next(err));
}

function getOwnOrders(req, res, next) {
  const currentUser = req.user;
  orderService
    .getByUser(currentUser.sub)
    .then(orders => orders ? res.json(orders) : res.sendStatus(404))
    .catch(err => next(err));
}

function createOrder(req, res, next) {
  const currentUser = req.user;
  const { cart, delivery, payment } = req.body;

  orderService
  .create(cart, delivery, payment, currentUser.sub)
  .then(response => res.json(response))
  .catch(err => next(err));

}

// admin only
router.get('/', authorize(Role.Admin), getAll);
router.get('/user/:id', authorize(Role.Admin), getByUser);

// all authenticated users
router.post('/', authorize(), createOrder);
router.get('/myorders/', authorize(), getOwnOrders);
router.get('/:id', authorize(), getById);


module.exports = router;
