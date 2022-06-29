/* eslint-disable react/jsx-no-bind */
import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { CssBaseline, Button, List, ListItem, Divider } from "@mui/material";
import styles from "./Personal.module.css";
import { userActions } from "../../redux/actions/userActions";

function Personal() {
  const isAdmin = useSelector((state)=> state.authentication?.user?.roles?.includes("Admin"));
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
            <Button variant="contained" style={{ marginLeft: "0rem" }}>
              Your orders
            </Button>
          </Link>

          <Link to="/personal/favorites">
            <Button variant="contained" style={{ marginLeft: "1rem" }}>
              Your favorites
            </Button>
          </Link>
        </ListItem>
        {isAdmin && <ListItem>
           <Link to="/admin">
            <Button variant="contained">To admin page</Button>
          </Link>
        </ListItem>}

        <Divider style={{ marginTop: "1rem", marginBottom: "0.5rem" }} />

        <ListItem>
          <Link to="/">
            <Button variant="text" style={{ marginLeft: "0rem" }}>
              Edit profile
            </Button>
          </Link>

          <Link to="/">
            <Button variant="text" style={{ marginLeft: "1rem" }}>
              To main page
            </Button>
          </Link>

          <Link className="NavLink" onClick={handleLogout} to="/">
            <Button variant="text" style={{ marginLeft: "1rem" }}>
              Sign out
            </Button>
          </Link>
        </ListItem>
      </List>
    </main>
  );
}

export default Personal;
