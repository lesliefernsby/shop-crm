import React from "react";
import { Grid, Typography, List, ListItem, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import styles from "./Checkout.module.css";

const addresses = [
  "1 Material-UI Drive",
  "Reactville",
  "Anytown",
  "99999",
  "USA",
];
const payments = [
  { name: "Card type", detail: "Visa" },
  { name: "Card holder", detail: "Mr John Smith" },
  { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
  { name: "Expiry date", detail: "04/2024" },
];

const total = (a, b) => (a * b).toFixed(2);
const totalOrder = (arr) => arr.reduce(
  (sum, current) =>
    sum + (current.quantity * current.item.price),
  0
).toFixed(2);

function Review() {
  const cart = useSelector((state) => state.cart);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart
          .sort((a, b) => a.item.id - b.item.id)
          .map((product) => (
            <ListItem className={styles.ListItem} key={product.item.id}>
              <ListItemText
                sx={{ width: 80, marginRight: 5 }}
                primary={product.item.title}
              />
              <ListItemText
                sx={{ width: 40, marginRight: 5, marginLeft: 5 }}
                primary={`${product.quantity} x $${product.item.price}`}
              />
              <Typography variant="body2">
                ${total(product.quantity, product.item.price)}
              </Typography>
            </ListItem>
          ))}
        <ListItem className={styles.ListItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={styles.Total}>
            $
            {totalOrder(cart)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={styles.Title}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={styles.Title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Review;
