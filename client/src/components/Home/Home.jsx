/* eslint-disable react/prop-types */
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import ProductsList from "../ProductsList/ProductsList";

function Home() {
  return (
    <div className="main">
      <CssBaseline />

      <Container maxWidth="lg">
        
        <ProductsList />
      </Container>
    </div>
  );
}

export default Home;
