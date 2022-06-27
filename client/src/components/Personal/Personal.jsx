/* eslint-disable react/jsx-no-bind */
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { CssBaseline, Button, List, ListItem } from "@mui/material";
import styles from "./Personal.module.css";
import { userActions } from "../../redux/actions/userActions";

function Personal() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(userActions.logout());
  }

  return (
    <main className={styles.Layout}>
      <CssBaseline />
      <Typography variant="h3" gutterBottom component="div">
        Personal page
      </Typography>


      <List>
        <ListItem>
          <Link to="/personal/orders">
            <Button variant="contained">Your orders</Button>
          </Link>
        </ListItem>

        <ListItem>
           <Link to="/personal/favorites">
            <Button variant="contained">Your favorites</Button>
          </Link>
        </ListItem>

        <ListItem>
          <Link to="/">
            <Button variant="text">Edit profile</Button>
          </Link>
        </ListItem>

        <ListItem>
          <Link to="/">
            <Button variant="text">To main page</Button>
          </Link>
        </ListItem>

        <ListItem>
          <Link className="NavLink" onClick={handleLogout} to="/">
            <Button variant="text">Sign out</Button>
          </Link>
        </ListItem>
      </List>
    </main>
  );
}

export default Personal;
