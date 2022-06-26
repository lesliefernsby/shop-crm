import React from "react";
import { Link } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import styles from "./Personal.module.css";
import PersonalOrders from "./PersonalOrders";

function Personal() {

  return (
    <main className={styles.Layout}>
      <CssBaseline />
      <div>Personal page</div>
      <PersonalOrders />
      <Link to="/">Back to main</Link>
    </main>
  );
}

export default Personal;
