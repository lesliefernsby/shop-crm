/* eslint-disable import/no-named-as-default */
/* eslint-disable react/prop-types */
import React, { useRef, useCallback , useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux'
import ProductCard from '../ProductCard/ProductCard';
import useProductSearch from '../customHooks/useProductSearch';
import { productsListActions } from '../../redux/actions/productsListActions';
import CategoryFilter from '../CategoryFilter/CategoryFilter';

function ProductsList(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productsListActions.setIsListPage(true));
    return () => {
      dispatch(productsListActions.setIsListPage(false));
    }
  }, []);

  const { query, pageNumber, setPageNumber } = props;

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
  }, [loading, hasMore, setPageNumber])

  return (
    <Box sx={{ flexGrow: 1 }}>
       <Grid container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        style={{ marginTop: '3.5rem' }}>
        <Grid container
          item xs={12}
          direction="row"
          justifyContent="center"
          alignItems="stretch">
          <CategoryFilter />
        </Grid>
        {products.map((product, index) => {
          if (products.length === index + 1) {
            return <Grid item container alignItems="stretch" xs={12} sm={6} md={4} key={`_${product.id}`}><div style={{ display: 'flex' }} ref={lastProductElementRef} key={product.id}><ProductCard product={product} /></div></Grid>;
          } 
            return <Grid item container alignItems="stretch" xs={12} sm={6} md={4} key={`_${product.id}`}><div style={{ display: 'flex' }} key={product.id}><ProductCard product={product} /></div></Grid>;
          
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
