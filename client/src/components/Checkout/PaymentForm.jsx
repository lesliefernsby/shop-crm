import React from "react";
import {
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { checkoutActions } from "../../redux/actions/checkoutActions";

function PaymentForm() {
  const dispatch = useDispatch();
  const checkout = useSelector((state) => state.checkout);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    dispatch(
      checkoutActions.addContactInfo({
        ...checkout.inputs,
        [name]: name !== "saveCard" ? value : checked,
      })
    );
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            name="cardName"
            onChange={handleChange}
            value={checkout.inputs.cardName}
            label="Name on card"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            onChange={handleChange}
            value={checkout.inputs.cardNumber}
            label="Card number"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            name="expDate"
            onChange={handleChange}
            label="Expiry date"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="cvv"
            onChange={handleChange}
            label="CVV"
            helperText="Last three digits on signature strip"
            value={checkout.inputs.cvv}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="saveCard"
                onChange={handleChange}
                checked={checkout.inputs.saveCard}
              />
            }
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default PaymentForm;
