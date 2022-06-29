import React from "react";
import { Link } from "react-router-dom";
import { CssBaseline, Button, List, ListItem, Typography } from "@mui/material";
import styles from "./Admin.module.css";

function Admin() {
  return (
    <main className={styles.Layout}>
      <CssBaseline />
      <Typography variant="h3" gutterBottom component="div">
        Admin page
      </Typography>

      <List>
        <ListItem>
          <Link to="/admin/users">
            <Button variant="contained">Users</Button>
          </Link>
        </ListItem>

        <ListItem>
          <Link to="/admin/chat/0">
            <Button variant="contained">Chat with guest</Button>
          </Link>
        </ListItem>

        <ListItem>
          <Link to="/">
            <Button variant="text">To main page</Button>
          </Link>
        </ListItem>
      </List>
    </main>
  );
}

export default Admin;
