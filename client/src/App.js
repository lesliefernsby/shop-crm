import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import ProductsList from './components/ProductsList/ProductsList';

function App() {
  return (
  <div className="main">
    <CssBaseline />
      <Container maxWidth="lg">
        <ProductsList />
      </Container>
    </div>
  );
}

export default App;
