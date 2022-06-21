import React from "react";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  makeStyles,
  Typography,
  useTheme,
  useMediaQuery
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DrawerComponent from "./DrawerComponent_ex";

const useStyles = makeStyles((theme) => ({
  navlinks: { marginLeft: theme.spacing(10), display: "flex" },
  logo: { flexGrow: "1", cursor: "pointer" },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(2),
    "&:hover": { color: "yellow", borderBottom: "1px solid yellow" }
  }
}));

function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static">
      <CssBaseline />

      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          The Shop
        </Typography>

        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>

            <Link to="/" className={classes.link}>
              Home
            </Link>

            <Link to="/login" className={classes.link}>
              Login
            </Link>

            <Link to="/" className={classes.link}>
              My cart
            </Link>

            <Link to="/checkout" className={classes.link}>
              Log Out
            </Link>

          </div>
        )}

      </Toolbar>

    </AppBar>
  );
}

export default Navbar;
