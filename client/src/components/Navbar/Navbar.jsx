/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Drawer,
  Badge,
  AppBar,
  Container,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import styled from "styled-components";
import {
  AddShoppingCart,
  Menu,
  Lock,
  MeetingRoom,
  Person,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Cart from "../Cart/Cart";
import { productsListActions } from "../../redux/actions/productsListActions";
// import CategoryFilter from '../CategoryFilter/CategoryFilter'
import { userActions } from "../../redux/actions/userActions";
import { cartActions } from "../../redux/actions/cartActions";

const StyledButton = styled(IconButton)`
  position: relative;
  z-index: 100;
  right: 30px;
  top: 90px;
`;

function Navbar() {
  const dispatch = useDispatch();

  const isProductListPage = useSelector(
    (state) => state.productsList.isProductListPage
  );
  const loggedIn = useSelector((state) => state.authentication.loggedIn);
  // console.log('isLogged', loggedIn)
  const user = useSelector((state) => state.authentication.user);
  // console.log('user', user)
  // const { query, setQuery, setPageNumber } = props;

  const query = useSelector((state) => state.productsList.query);

  const cartOpen = useSelector((state) => state.cartDialog);
  const cart = useSelector((state) => state.cart);

  function handleSearch(e) {
    dispatch(productsListActions.setQuery(e.target.value));
    dispatch(productsListActions.setPageNumber(1));
  }

  function handleLogout() {
    dispatch(userActions.logout());
  }

  return (
    <AppBar>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ mr: 1 }}>
            <Link className="NavLink" to="/">
              <IconButton size="large" color="inherit">
                <Menu />
              </IconButton>
            </Link>
          </Box>

          <Typography
            variant="h6"
            component="h2"
            noWrap
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            style={{ minWidth: "20%", margin: "0.5rem" }}
          >
            The Top Shop
          </Typography>

          <Typography
            variant="h6"
            component="h2"
            noWrap
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            TTS
          </Typography>

          {isProductListPage && (
            <Grid
              container
              item
              xs={12}
              direction="row"
              justifyContent="center"
              alignItems="stretch"
            >
              <TextField
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="What are we looking for?"
                style={{ width: "50%", margin: "0.5rem" }}
              />
            </Grid>
          )}

          {loggedIn ? (
            <>
              <Link className="NavLink" to="/personal">
                <Button color="inherit" startIcon={<Person />}>
                  {user.firstName}
                </Button>
              </Link>

              <Link className="NavLink" onClick={handleLogout} to="/">
                <Button color="inherit" startIcon={<MeetingRoom />}>
                  Logout
                </Button>
              </Link>
            </>
          ) : (
            <Link className="NavLink" to="/login">
              <Button color="inherit" startIcon={<Lock />}>
                Login
              </Button>
            </Link>
          )}

          <StyledButton onClick={() => dispatch(cartActions.openCart())}>
            <Badge badgeContent={cart.length} color="error">
              <AddShoppingCart style={{ fontSize: "50px" }} />
            </Badge>
          </StyledButton>

          <Drawer
            anchor="right"
            open={cartOpen.isOpen}
            onClose={() => dispatch(cartActions.closeCart())}
          >
            <Cart />
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
