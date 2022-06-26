/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
const { Order } = require('../db/models');
const { Delivery } = require('../db/models');
const { OrderProduct } = require('../db/models');
const { Product } = require('../db/models');

async function getAll() {
  const orders = await Order.findAll({
    include: [
      { model: Delivery, raw: true },
      {
        model: OrderProduct,
        include: { model: Product },
      },
    ],
    nest: true,
  });
  return orders;
}

async function getByUser(user) {
  const orders = await Order.findAll({
    where: {
      userId: user,
    },
    include: [
      { model: Delivery, raw: true },
      {
        model: OrderProduct,
        include: { model: Product },
      },
    ],
    nest: true,
  });
  return orders;
}

async function getById(id) {
  const orders = await Order.findOne({
    where: {
      id,
    },
    include: [
      { model: Delivery, raw: true },
      {
        model: OrderProduct,
        include: { model: Product },
      },
    ],
    nest: true,
  });
  return orders;
}

async function create(cart, delivery, payment, currentUser) {
  const order = await Order.create({ userId: currentUser });
  await Delivery.create({ ...delivery, orderId: order.id });
  for await (entry of cart) {
    await OrderProduct.create({
      orderId: order.id,
      productId: entry.item.id,
      quantity: entry.quantity,
    });
  }
  return order;
}

module.exports = {
  getAll,
  getByUser,
  getById,
  create,
};
