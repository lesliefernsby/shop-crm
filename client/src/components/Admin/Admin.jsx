import React from "react";
import {
  Grid,
  Typography,
  TextField,
  // FormControlLabel,
  // Checkbox,
  Container,
  Paper,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../redux/actions/adminActions";

function Admin() {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'productImageURL') {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      dispatch(
        adminActions.addNewProductInfo({ ...admin.inputs, productImageURL: formData  })
      );
    } else {
      dispatch(
        adminActions.addNewProductInfo({ ...admin.inputs, [name]: value  })
      );
    }
    
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '7rem' }}>
      <Paper elevation={1} sx={{ padding: '0 40px 40px 40px' }}>
        <Typography component="h1" variant="h4" align="center" sx={{ marginBottom: '1rem' }}>
          Add product
        </Typography>

        <Grid container spacing={2}>

          <Grid item xs={12}>
            <TextField
              required
              id="productCategoryTitle"
              name="productCategoryTitle"
              label="Product Category Title"
              fullWidth
              autoComplete="title"
              onChange={handleChange}
              value={admin.inputs.productCategoryTitle}
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
              value={admin.inputs.productTitle}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              component="label"
            >
              Upload image
              <input
                type="file"
                hidden
                name="productImageURL"
                value={admin.inputs.uploadImageURL}
                onChange={handleChange}
              />
            </Button>          
            </Grid>

          <Grid item xs={12}>
            <TextField
              id="productDescription"
              name="productDescription"
              label="Product Description"
              fullWidth
              multiline
              minRows={3}
              required
              autoComplete="billing address-line2"
              onChange={handleChange}
              value={admin.inputs.productDescription}
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
              type="number"
              value={admin.inputs.weight}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="price"
              name="price"
              label="Price"
              type="number"
              fullWidth
              autoComplete="billing state"
              onChange={handleChange}
              value={admin.inputs.price}
            />
          </Grid>

          <Grid container spacing={2} sx={{marginTop: '1rem'}} direction="row" justifyContent='center'>
            <Button variant="contained" color="secondary" sx={{ marginTop: '1rem' }}>Submit</Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Admin;
