import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Divider,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { personalActions } from "../../redux/actions/personalActions";

import styles from "./Personal.module.css";

function Order() {
  const params = useParams();
  const dispatch = useDispatch();
  const personal = useSelector((state) => state.personal);

  useEffect(() => {
    dispatch(personalActions.getMyOrders());
  }, [dispatch]);

  let order;
  let addresses;

  if (!personal.loading) {
    order = personal.orders.find((o) => o.id === parseInt(params.id, 10));

    addresses = [
      order.Delivery.address1,
      order.Delivery.address2,
      order.Delivery.city,
      order.Delivery.state,
      order.Delivery.country,
      order.Delivery.zip,
    ];
  }
  const total = (a, b) => (a * b).toFixed(2);
  const totalOrder = (arr) =>
    arr
      .reduce(
        (sum, current) => sum + current.quantity * current.Product.price,
        0
      )
      .toFixed(2);

  return (
    <main className={styles.Layout}>
      <CssBaseline />
      {order && (
        <>
          <h1>Order #{order.id}</h1>
          <Typography variant="h6" gutterBottom>
            Order summary
          </Typography>
          <List disablePadding>
            {order.OrderProducts.sort(
              (a, b) => a.Product.id - b.Product.id
            ).map((product) => (
              <ListItem className={styles.ListItem} key={product.Product.id}>
                <ListItemText
                  sx={{ width: 80, marginRight: 5 }}
                  primary={product.Product.title}
                />
                <ListItemText
                  sx={{ width: 40, marginRight: 5, marginLeft: 5 }}
                  primary={`${product.quantity} x $${product.Product.price}`}
                />
                <Typography variant="body2">
                  ${total(product.quantity, product.Product.price)}
                </Typography>
              </ListItem>
            ))}
            <ListItem className={styles.ListItem}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" className={styles.Total}>
                ${totalOrder(order.OrderProducts)}
              </Typography>
            </ListItem>
          </List>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom className={styles.Title}>
                Shipping
              </Typography>
              <Typography
                gutterBottom
              >{`${order.Delivery.firstName} ${order.Delivery.lastName}`}</Typography>
              <Typography gutterBottom>{addresses.join(", ")}</Typography>
            </Grid>
            <Grid item container direction="column" xs={12} sm={6}>
              <Typography variant="h6" gutterBottom className={styles.Title}>
                Payment details
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
      <Divider />

      <List>
        <ListItem>
          <Link to="/personal">
            <Button variant="contained">Your profile</Button>
          </Link>

          <Link to="/personal/orders">
            <Button variant="text" style={{ marginLeft: "1rem" }}>
              Your orders
            </Button>
          </Link>
        </ListItem>
      </List>
    </main>
  );
}

export default Order;
