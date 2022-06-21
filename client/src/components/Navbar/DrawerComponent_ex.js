import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Toolbar,
  Typography,
  makeStyles
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles(() => ({
  link: { textDecoration: "none", color: "blue", fontSize: "20px" },
  icon: { color: "white" },
  logo: { flexGrow: "1", cursor: "pointer" },
  draw: { background: "red" }
}));

function DrawerComponent() {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Drawer
        anchor="top"
        sx={{ width: 250, color: "#fff" }}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <Toolbar sx={{ backgroundColor: "primary.main" }}>
          <Typography variant="h4" className={classes.logo}>
            The Shop_m
          </Typography>
          <CloseIcon />
        </Toolbar>
        <box sx={{ backgroundColor: "primary.main" }} height="100vh">
          <List height="100vh">
            <Divider />

            <ListItem onClick={() => setOpenDrawer(false)}>
              <ListItemText>
                <Link to="/" className={classes.link}>
                  Home Page
                </Link>
              </ListItemText>
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemText>
                <Link to="/login" className={classes.link}>
                  Login
                </Link>
              </ListItemText>
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemText>
                <Link to="/" className={classes.link}>
                  My cart
                </Link>
              </ListItemText>
            </ListItem>

            <Divider />

            <ListItem>
              <ListItemText>
                <Link to="/checkout" className={classes.link}>
                  Log Out
                </Link>
              </ListItemText>
            </ListItem>

            <Divider />

          </List>
        </box>
      </Drawer>
      
      <IconButton
        className={classes.icon}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon />
      </IconButton>
    </>
  );
}

export default DrawerComponent;
