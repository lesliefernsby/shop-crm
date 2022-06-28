import React from "react";
import {
  Grid,
  Typography,
  TextField,
  // FormControlLabel,
  // Checkbox,
  Container,
  Paper,
  Stack,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { checkoutActions } from "../../redux/actions/checkoutActions";

function Admin() {
  const dispatch = useDispatch();
  const checkout = useSelector((state) => state.checkout);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    dispatch(
      checkoutActions.addContactInfo({ ...checkout.inputs, [name]: name !== 'saveAddress' ? value : checked })
    );
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '5rem' }}>
      <Paper elevation={1} sx={{ padding: '0 40px 40px 40px' }}>
        <Typography component="h1" variant="h4" align="center" sx={{ marginBottom: '1rem' }}>
          Add product
        </Typography>

        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={6}>
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
          </Grid> */}
          <Grid item xs={12}>
            <TextField
              required
              id="productCategoryTitle"
              name="productCategoryTitle"
              label="Product Category Title"
              fullWidth
              autoComplete="phone"
              onChange={handleChange}
              value={checkout.inputs.phone}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="productTitle"
              name="productTitle"
              label="Product Title"
              fullWidth
              autoComplete="email"
              onChange={handleChange}
              value={checkout.inputs.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="productImageURL"
              name="productImageURL"
              label="Product image URL"
              fullWidth
              autoComplete="billing address-line1"
              onChange={handleChange}
              value={checkout.inputs.address1}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="productDescription"
              name="productDescription"
              label="Product Description"
              fullWidth
              autoComplete="billing address-line2"
              onChange={handleChange}
              value={checkout.inputs.address2}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="weight"
              name="weight"
              label="Weight"
              fullWidth
              autoComplete="billing address-level2"
              onChange={handleChange}
              value={checkout.inputs.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="price"
              name="price"
              label="Price"
              fullWidth
              autoComplete="billing state"
              onChange={handleChange}
              value={checkout.inputs.state}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
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
          </Grid> */}
          <Stack spacing={2} direction="row" >
            <Button variant="contained" align="center" sx={{ marginTop: '1rem' }}>Submit</Button>
          </Stack>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Admin;
