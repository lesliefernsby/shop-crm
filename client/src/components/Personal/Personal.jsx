import React from "react";
import { Link } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import styles from "./Personal.module.css";

function Personal() {
  return (
    <main className={styles.Layout}>
      <CssBaseline />
      <div>Personal page</div>
      <Link to="/">Back to main</Link>
    </main>
  );
}

export default Personal;
