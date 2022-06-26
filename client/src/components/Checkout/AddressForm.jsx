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

function AddressForm() {
  const dispatch = useDispatch();
  const checkout = useSelector((state) => state.checkout);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    dispatch(
      checkoutActions.addContactInfo({ ...checkout.inputs, [name]: name !== 'saveAddress' ? value : checked})
    );
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="fname"
            onChange={handleChange}
            value={checkout.inputs.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="lname"
            onChange={handleChange}
            value={checkout.inputs.lastName}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            autoComplete="phone"
            onChange={handleChange}
            value={checkout.inputs.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            label="email"
            fullWidth
            autoComplete="email"
            onChange={handleChange}
            value={checkout.inputs.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Address line 1"
            fullWidth
            autoComplete="billing address-line1"
            onChange={handleChange}
            value={checkout.inputs.address1}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="billing address-line2"
            onChange={handleChange}
            value={checkout.inputs.address2}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            fullWidth
            autoComplete="billing address-level2"
            onChange={handleChange}
            value={checkout.inputs.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            fullWidth
            autoComplete="billing state"
            onChange={handleChange}
            value={checkout.inputs.state}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="billing postal-code"
            onChange={handleChange}
            value={checkout.inputs.zip}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            fullWidth
            autoComplete="billing country"
            onChange={handleChange}
            value={checkout.inputs.country}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                name="saveAddress"
                onChange={handleChange}
                color="secondary"
                checked={checkout.inputs.saveAddress}
              />
            }
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default AddressForm;
