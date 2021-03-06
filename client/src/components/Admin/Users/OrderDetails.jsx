import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  CssBaseline,
  Button,
} from "@mui/material";
import { useParams, Link } from "react-router-dom";
import { authHeader } from "../../../redux/helpers/authHeader";
import { config } from "../../../redux/constants";

import styles from "../Admin.module.css";

function OrderDetails() {
  const params = useParams();

  const [order, setOrder] = useState(null);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: authHeader(),
    };
  
    fetch(`${config.API_URL}/orders/${params.id}`, requestOptions)
    .then((res) => res.json())
    .then((o) => setOrder(o));
  }, []);


  let addresses;
  if (order) {
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
          <Typography variant="h3" gutterBottom component="div">
            Order #{order.id}
          </Typography>
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
      <List>
        <ListItem>
          <Link to="/admin/users">
            <Button variant="contained">Back to users</Button>
          </Link>
        </ListItem>

        <ListItem>
          <Link to="/">
            <Button variant="text">To main page</Button>
          </Link>
        </ListItem>
      </List>
    </main>
  );
}

export default OrderDetails;
