import React from "react";
import { Link } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import styles from "./Personal.module.css";

function Personal() {
  return (
    <main className={styles.Layout}>
      <CssBaseline />
      <div>Personal page</div>

      <ul>
        <li>
          <Link to="/personal/orders">Your orders</Link>
        </li>
        <li>
          <Link to="/personal/favorites">Your favorites</Link>
        </li>
        <li>
          <Link to="/">Back to main</Link>
        </li>
      </ul>
    </main>
  );
}

export default Personal;
