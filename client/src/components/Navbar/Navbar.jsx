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
  // Menu,
  Lock,
  MeetingRoom,
  Person,
} from "@mui/icons-material";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import Cart from "../Cart/Cart";
import { userActions } from "../../redux/actions/userActions";
import { cartActions } from "../../redux/actions/cartActions";
import { chatActions } from "../../redux/actions/chatActions";
import Chat from "../Chat/Chat";

const StyledButton = styled(IconButton)`
  position: relative;
  z-index: 100;
  right: 5px;
  top: 5px;
`;
const ChatButton = styled(IconButton)`
  position: relative;
  z-index: 100;
  right: 5px;
  top: 5px;
`;

function Navbar({ socket }) {
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.authentication.loggedIn);

  const user = useSelector((state) => state.authentication.user);

  const cartOpen = useSelector((state) => state.cartDialog);
  const cart = useSelector((state) => state.cart);
  const chat = useSelector((state) => state.chat);

  function handleLogout() {
    dispatch(userActions.logout());
  }

  return (
    <AppBar>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ mr: 1 }}>
            <Link className="NavLink" to="/">
              <IconButton   sx={{color: 'black'}} size="large" color="inherit">
                <HomeIcon />
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
            The Awesome Shop
          </Typography>

          <Typography
            variant="h6"
            component="h2"
            noWrap
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            T.A.S.
          </Typography>

          {loggedIn ? (
            <>
              <Link className="NavLink" to="/personal">
                <Button  sx={{color: 'black'}} startIcon={<Person />}>
                  {user.firstName}
                </Button>
              </Link>

              <Link className="NavLink" onClick={handleLogout} to="/">
                <Button sx={{color: 'black'}} startIcon={<MeetingRoom />}>
                  Logout
                </Button>
              </Link>
            </>
          ) : (
            <Link className="NavLink" to="/login">
              <Button  sx={{color: 'black'}} startIcon={<Lock />} >
                Login
              </Button>
            </Link>
          )}

          <StyledButton onClick={() => dispatch(cartActions.openCart())} sx={{marginLeft: '1rem'}}>
            <Badge badgeContent={cart.length} color="error">
              <AddShoppingCart style={{ fontSize: "50px" }}  />
            </Badge>
          </StyledButton>

          <ChatButton onClick={() => dispatch(chatActions.toggleOpenChat())}  sx={{marginLeft: '1rem'}}>
            <Badge badgeContent={1} color="error">
              <MarkUnreadChatAltIcon style={{ fontSize: "50px" }} />
            </Badge>
          </ChatButton>

          <Drawer
            anchor="right"
            open={cartOpen.isOpen}
            onClose={() => dispatch(cartActions.closeCart())}
          >
            <Cart />
          </Drawer>

          <Drawer
            anchor="right"
            open={chat.isOpen}
            onClose={() => dispatch(chatActions.toggleOpenChat())}
          >
            <Chat socket={socket} />
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
