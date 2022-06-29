
import React, { useState } from "react";
import {
  Alert,
  Grid,
  Typography,
  TextField,
  // FormControlLabel,
  // Checkbox,
  Container,
  Paper,
  Button,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useDispatch, useSelector } from "react-redux";
import { adminActions } from "../../redux/actions/adminActions";

function AddProduct() {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const { error, pending } = useSelector((state) => state.admin);

  const [uploadBtnText, setUploadBtnText] = useState('Upload image')
  const [fileName, setFileName] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'productImageURL') {
      dispatch(
        adminActions.addNewProductInfo({ ...admin.inputs, productImageURL: e.target.files[0] })
      );
      setFileName(e.target?.files[0]?.name || '');

      setUploadBtnText('Upload another');
} else {
  dispatch(
    adminActions.addNewProductInfo({ ...admin.inputs, [name]: value })
  );
}
    
  };
const handleSubmit = () => {
  dispatch(adminActions.submitNewProduct(admin.inputs));
  setUploadBtnText("Upload image")
  setFileName('')

}
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
        <Grid container alignItems="center" item xs={12}>
          <Button
            variant="contained"
            component="label"

          >
            {uploadBtnText}
            <input
              type="file"
              hidden
              name="productImageURL"
              value={admin.inputs.uploadImageURL}
              onChange={handleChange}
            />
            {pending && <CircularProgress color="secondary" />}
          </Button>
          {fileName && <><Typography sx={{margin: '10px'}}>{fileName}{'  '}</Typography><CheckCircleOutlineIcon color="success" size={20} /></>}
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

        <Grid container spacing={2} sx={{ marginTop: '1rem', marginLeft: '0px' }} direction="row" justifyContent='center'>
          <Button variant="contained" color="secondary" sx={{ marginTop: '1rem' }} onClick={handleSubmit}>Submit{pending && <CircularProgress color="primary" size={20} />}</Button>
        </Grid>
        {error && <Alert severity="warning">Something went wrong...</Alert>}
      </Grid>
    </Paper>
  </Container>
);
}
export default AddProduct;
