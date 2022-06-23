/* eslint-disable react/prop-types */
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import ProductsList from "../ProductsList/ProductsList";

function Home(props) {
  const { query, pageNumber, setPageNumber } = props;

  return (
    <div className="main">
      <CssBaseline />

      <Container maxWidth="lg">
        <ProductsList
          query={query}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </Container>
    </div>
  );
}

export default Home;
