import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";

function Cart() {
  const cart = useSelector((state) => state.cart);

  const calculateTotal = () =>
    cart.reduce((acc, entry) => acc + entry.quantity * entry.item.price, 0);

  return (
    <div className={styles.CartWrapper}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>No items in cart.</p> : null}
      {cart
        .sort((a, b) => a.item.id - b.item.id)
        .map((entry) => (
          <CartItem key={entry.item.id} entry={entry} />
        ))}

      <p>Total price: {calculateTotal()}</p>
    </div>
  );
}

export default Cart;
