import React, { useState } from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ProductDialog from '../ProductDialog/ProductDialog'
import Chip from '@mui/material/Chip';


const ProductCard = (props) => {
  const { product, modal } = props;
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  }

  return (
    <React.Fragment>
      <ProductDialog open={open} setOpen={setOpen} product={product} />
      <Card sx={{ maxWidth: modal ? 500 : 345, display: 'flex', flexDirection: 'column'}} scroll={"paper"}>
        <CardHeader
          action={
            <Chip label={<Typography variant="h6">{product.price}</Typography>} color="secondary" />
          }
        />
        <CardMedia
          component="img"
          width="240"
          image={product.image}
          alt={product.title}
          onClick={() => modal ? null : openModal()}
        />
        <CardContent onClick={() => modal ? null : openModal()}>
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {modal ? product.description : product.description.length > 100 ? product.description.slice(0, 100) + '...' : product.description}
            {/* {!modal && product.description.length > 100 && <Button color={'info'}>Learn more</Button>} */}
          </Typography>
          {modal && <Typography variant="body2" color="text.secondary" sx={{ margin: '1rem 0' }}>
            {product.weight} kg
          </Typography>}
        </CardContent>
        <CardActions sx={{margin: 'auto 0 1rem'}}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Box sx={{ '& > :not(style)': { m: 1 }, marginLeft: 'auto' }}>
            <Button size="small" >Add to cart</Button>
            <Fab color="primary" aria-label="add">
              <ShoppingCartOutlinedIcon />
            </Fab>
          </Box>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

export default ProductCard;
