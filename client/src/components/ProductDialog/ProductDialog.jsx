/* eslint-disable react/prop-types */
/* eslint-disable import/no-cycle */
import React from 'react';
import Dialog from '@mui/material/Dialog';
import ProductCard from '../ProductCard/ProductCard';

function ProductDialog(props) {
  const { open, setOpen, product } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll='body'
    >
      <ProductCard product={product} modal />
    </Dialog>
  )
}

export default ProductDialog;
