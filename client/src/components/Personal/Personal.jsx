import React from "react";
import {useSelector} from 'react-redux'
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { CssBaseline, Button, List, ListItem } from "@mui/material";
import styles from "./Personal.module.css";

function Personal() {
  const isAdmin = useSelector((state)=> state.authentication?.user?.roles?.includes("Admin"));

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
        {isAdmin && <ListItem>
           <Link to="/admin">
            <Button variant="contained">Add product</Button>
          </Link>
        </ListItem>}

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
