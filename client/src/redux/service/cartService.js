/* eslint-disable import/prefer-default-export */

function addToCart(item) {
  console.log(item);
  // will persist here
}

function removeFromCart(item) {
  console.log(item);
  // will persist here
}

export const cartService = {
  addToCart,
  removeFromCart
};

