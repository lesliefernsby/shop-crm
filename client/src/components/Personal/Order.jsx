import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { personalActions } from "../../redux/actions/personalActions";
import styles from "./Personal.module.css";

function Order() {
  const params = useParams();
  const dispatch = useDispatch();
  const personal = useSelector((state) => state.personal);

  useEffect(() => {
    dispatch(personalActions.getMyOrders());
  }, [dispatch]);
  const order = personal.orders.find((o) => o.id === parseInt(params.id, 10));
  return (
    <main className={styles.Layout}>
      <CssBaseline />
      {order && <div>Order {order.id} page</div>}
      <Link to="/personal">Back to orders</Link>
    </main>
  );
}

export default Order;
