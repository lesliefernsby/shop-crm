import React from 'react';
import Dialog from '@mui/material/Dialog';
import ProductCard from '../ProductCard/ProductCard';

const ProductDialog = (props) => {
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
      <ProductCard product={product} modal={true} />
    </Dialog>
  )
}

export default ProductDialog;
