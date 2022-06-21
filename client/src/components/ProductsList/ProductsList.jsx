import React, { useState, useRef, useCallback } from 'react'
import useProductSearch from '../customHooks/useProductSearch';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ProductCard from '../ProductCard/ProductCard';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

const ProductsList = () => {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const {
    products,
    hasMore,
    loading,
    error
  } = useProductSearch(query, pageNumber)

  const observer = useRef()
  const lastProductElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

        <Grid
          container
          item xs={12}
          direction="row"
          justifyContent="center"
          alignItems="stretch">
          <TextField type="text" value={query} onChange={handleSearch} placeholder={'What are we looking for?'} style={{ minWidth: '30%', margin: '3rem' }}></TextField>
        </Grid>
        {products.map((product, index) => {
          if (products.length === index + 1) {
            return <Grid item container alignItems="stretch" xs={12} sm={6} md={4} key={index}><div style={{display: 'flex'}} ref={lastProductElementRef} key={product.id}><ProductCard product={product} /></div></Grid>;
          } else {
            return <Grid item container alignItems="stretch" xs={12} sm={6} md={4} key={index}><div style={{display: 'flex'}} key={product.id}><ProductCard product={product} /></div></Grid>;
          }
        })}
        <Grid
          container
          item xs={12}
          direction="column"
          justifyContent="center"
          alignItems="center">
          <div style={{ margin: '3rem' }}>{loading && <CircularProgress color="secondary" />}</div>
          <div>{error && <Alert severity="warning">Something went wrong...</Alert>}</div>
        </Grid>

      </Grid>
    </Box>
  )
}

export default ProductsList;
