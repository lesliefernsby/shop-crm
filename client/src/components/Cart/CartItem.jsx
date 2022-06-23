/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { cartActions } from "../../redux/actions/cartActions";
import styles from "./Cart.module.css";

function CartItem({ entry }) {
  const dispatch = useDispatch();

  return (
    <div className={styles.CartItemWrapper}>
      <div className={styles.cartItemInfo}>
        <h3>{entry.item.title}</h3>
        <div className={styles.information}>
          <p>Price: ${entry.item.price}</p>
          <p>Total: ${(entry.quantity * entry.item.price).toFixed(2)}</p>
        </div>
        <div className={styles.buttons}>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => dispatch(cartActions.removeFromCart(entry.item))}
          >
            -
          </Button>
          <p>{entry.quantity}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => dispatch(cartActions.addToCart(entry.item))}
          >
            +
          </Button>
        </div>
      </div>
      <img
        className={styles.CartImage}
        src={entry.item.image}
        alt={entry.item.title}
      />
    </div>
  );
}

export default CartItem;
