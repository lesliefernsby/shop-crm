import React from "react";
import { Grid, Typography, List, ListItem, ListItemText } from "@mui/material";
import { useSelector } from "react-redux";
import styles from './Checkout.module.css';


const total = (a, b) => (a * b).toFixed(2);
const totalOrder = (arr) => arr.reduce(
  (sum, current) =>
    sum + (current.quantity * current.item.price),
  0
).toFixed(2);

function Review() {
  const cart = useSelector((state) => state.cart);
  const checkout = useSelector(state => state.checkout);
  const addresses = [
    checkout.inputs.address1,
    checkout.inputs.address2,
    checkout.inputs.city,
    checkout.inputs.state,
    checkout.inputs.country,
    checkout.inputs.zip,

  ];

  const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: checkout.inputs.cardName },
    { name: "Card number", detail: `xxxx-xxxx-xxxx-${checkout.inputs.cardNumber.slice(checkout.inputs.cardNumber.length - 4)}` },
    { name: "Expiry date", detail: checkout.inputs.expDate },
  ];

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
          <Typography gutterBottom>{`${checkout.inputs.firstName} ${checkout.inputs.lastName}`}</Typography>
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
