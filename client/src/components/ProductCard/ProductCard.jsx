/* eslint-disable import/no-cycle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {  styled } from '@mui/material/styles';

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import ShareIcon from "@mui/icons-material/Share";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Chip from "@mui/material/Chip";
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from "react-redux";
import ProductDialog from "../ProductDialog/ProductDialog";
import EditDialog from "../EditDialog/EditDialog";
import { cartActions } from "../../redux/actions/cartActions";
import { productsListActions } from "../../redux/actions/productsListActions";
import { adminActions } from "../../redux/actions/adminActions";
import styles from "./productCard.module.css";
import { config } from "../../redux/constants";

function ProductCard(props) {
  const { product, modal } = props;
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const likes = useSelector((state) => state.productsList.likes);
  const isLiked = likes.includes(product.id);
  const isLoggedIn = useSelector((state) => state.authentication?.loggedIn);
  const isAdmin = useSelector((state)=> state.authentication?.user?.roles?.includes("Admin"));
  const dispatch = useDispatch();

  const openModal = () => {
    setOpen(true);
  };

  const handleAdd = () => {
    dispatch(cartActions.addToCart(product));
  };

  // const handleRemove = () => {
  //   dispatch(cartActions.removeFromCart(product));
  // };

  const addToggleLike = (id) => {
    dispatch(productsListActions.toggleLike(id));
  };

  const toggleHideProduct = () => {
    dispatch(adminActions.toggleHideStatus(product.id));
  };

const editProduct = () => {
  setOpenEdit(true)
}
  const options = {
    shouldForwardProp: (prop) => prop !== 'bgcolor',
  };
  const StyledChip = styled(
    Chip,
    options,
  )(({ bgcolor }) => ({
    color: 'white',
    backgroundColor: bgcolor,
  }));
  return (
    <>
      <ProductDialog open={open} setOpen={setOpen} product={product} />
      <EditDialog openEdit={openEdit} setOpenEdit={setOpenEdit} product={product} />
      <Card
        sx={{
          maxWidth: modal ? 500 : 345,
          display: "flex",
          flexDirection: "column",
        }}
        scroll="paper"
      >
        <Grid container sx={{position: "relative"}}>
          <CardHeader
         
          action={
            <Chip
              label={<Typography variant="h6">${product.price}</Typography>}
              color="secondary"
            />
          }
        />
        {product.hide && <div className={styles.backdrop} />}
        </Grid>
        
        <Grid container sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          height: "100%",
          alignItems: "center",
          position: "relative"
        }}>
          <CardMedia
            className={styles.img}
            component="img"
            width="240"
            image={`${config.API_URL}${product.image}`}
            alt={product.title}
            onClick={() => (modal ? null : openModal())}
          />
          <CardContent onClick={() => (modal ? null : openModal())}>
            <Typography variant="h6">{product.categoryId}cat</Typography>
            <Typography variant="h6">{product.id}id</Typography>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {modal
                ? product.description
                : product.description.length > 100
                  ? `${product.description.slice(0, 100)}...`
                  : product.description}
              {/* {!modal && product.description.length > 100 && <Button color={'info'}>Learn more</Button>} */}
            </Typography>
            {modal && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ margin: "1rem 0" }}
              >
                {product.weight} kg
              </Typography>
            )}
          </CardContent>
          {product.hide && <div className={styles.backdrop} />}
          {product.hide && <StyledChip sx={{position: 'absolute'}} label="Out of stock" variant="outlined" />}

        </Grid>
        <CardActions sx={{ margin: "auto 0 1rem" }}>
          {isLoggedIn && (
            <IconButton
              aria-label="add to favorites"
              onClick={() => addToggleLike(product.id)}
              color={isLiked ? "secondary" : "info"}
            >
              <FavoriteIcon />
            </IconButton>
          )}
          {/* <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
          {isAdmin && (product.hide ?
            <IconButton aria-label="delete" onClick={toggleHideProduct}><RestoreFromTrashIcon /></IconButton> :
            <IconButton aria-label="delete" onClick={toggleHideProduct}><DeleteIcon /></IconButton>)}
          {isAdmin && <IconButton aria-label="edit" onClick={editProduct}>
            <EditIcon />
          </IconButton>}
          <Box sx={{ "& > :not(style)": { m: 1 }, marginLeft: "auto" }}>
            {/* <Button onClick={handleRemove} size="small">
            Remove
          </Button> */}
            {/* <Button onClick={handleAdd} size="small">
              Add
            </Button> */}
            <Fab onClick={handleAdd} disabled={product.hide} color="primary" aria-label="add">
              <ShoppingCartOutlinedIcon />
            </Fab>
          </Box>
        </CardActions>
      </Card>
    </>
  );
}

export default ProductCard;
