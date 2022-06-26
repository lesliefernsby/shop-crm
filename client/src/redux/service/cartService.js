/* eslint-disable no-nested-ternary */
/* eslint-disable import/prefer-default-export */

function addToCart(item) {
  const oldCart = JSON.parse(localStorage.getItem("cart"));

  if (!oldCart) {
    localStorage.setItem("cart", JSON.stringify([{ item, quantity: 1 }]));
  } else {
    localStorage.removeItem("cart");
    const newCart = oldCart.some((entry) => entry.item.id === item.id)
      ? [
          ...oldCart.filter((entry) => entry.item.id !== item.id),
          {
            item,
            quantity:
              oldCart.find((entry) => entry.item.id === item.id).quantity + 1,
          },
        ]
      : [
          ...oldCart,
          {
            item,
            quantity: 1,
          },
        ];

    localStorage.setItem("cart", JSON.stringify(newCart));
  }
}

function removeFromCart(item) {
  const oldCart = JSON.parse(localStorage.getItem("cart"));

  if (oldCart) {
    localStorage.removeItem("cart");
    const newCart = oldCart.some((entry) => entry.item.id === item.id)
      ? oldCart.find((entry) => entry.item.id === item.id).quantity > 1
        ? [
            ...oldCart.filter((entry) => entry.item.id !== item.id),
            {
              item,
              quantity:
                oldCart.find((entry) => entry.item.id === item.id).quantity - 1,
            },
          ]
        : [...oldCart.filter((entry) => entry.item.id !== item.id)]
      : [...oldCart];

    localStorage.setItem("cart", JSON.stringify(newCart));
  }
}

function resetCart() {
  localStorage.removeItem("cart");
}

export const cartService = {
  addToCart,
  removeFromCart,
  resetCart
};
