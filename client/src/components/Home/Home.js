import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ProductsList from '../ProductsList/ProductsList';

const Home = () => {
  return (
    <div className="main">
      <CssBaseline />
      <Container maxWidth="lg">
        <ProductsList />
      </Container>
  </div>
  )
}

export default Home
