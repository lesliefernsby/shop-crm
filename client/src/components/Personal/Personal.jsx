import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { CssBaseline, Button, List, ListItem } from "@mui/material";
import styles from "./Personal.module.css";

function Personal() {
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
          <Link to="/">
            <Button variant="text">To main page</Button>
          </Link>
        </ListItem>
      </List>
    </main>
  );
}

export default Personal;
