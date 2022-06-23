import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import { cartActions } from "../../redux/actions/cartActions";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const calculateTotal = () =>
    cart.reduce((acc, entry) => acc + entry.quantity * entry.item.price, 0);

  function handleSubmit() {
    dispatch(cartActions.closeCart());
    navigate("/checkout");
  }

  return (
    <div className={styles.CartWrapper}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? <p>No items in cart.</p> : null}
      {cart
        .sort((a, b) => a.item.id - b.item.id)
        .map((entry) => (
          <CartItem key={entry.item.id} entry={entry} />
        ))}

      <p>Total price: ${calculateTotal().toFixed(2)}</p>

      {cart.length > 0 && <Button
        type="submit"
        variant="contained"
        color="primary"
        endIcon={<ArrowRightAltIcon />}
        onClick={()=>handleSubmit()}
      >
        Proceed to checkout
      </Button>}
    </div>
  );
}

export default Cart;
