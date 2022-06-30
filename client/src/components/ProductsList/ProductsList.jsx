
import React, { useRef, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { productsListActions } from "../../redux/actions/productsListActions";
import CategoryFilter from "../CategoryFilter/CategoryFilter";
import ProductCard from "../ProductCard/ProductCard";
import useProductSearch from "../customHooks/useProductSearch";

function ProductsList() {
  const dispatch = useDispatch();
  const { query, pageNumber } = useSelector((state) => state.productsList);
  const isLoggedIn = useSelector((state) => state.authentication?.loggedIn);
  const isProductListPage = useSelector(
    (state) => state.productsList.isProductListPage
  );

  useEffect(() => {
    dispatch(productsListActions.setIsListPage(true));
    return () => {
      dispatch(productsListActions.setIsListPage(false));
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(productsListActions.fetchUserLikeIds());
    }
  }, []);

  const { products, hasMore, loading, error } = useProductSearch(
    query,
    pageNumber
  );

  const observer = useRef();
  const lastProductElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          // setPageNumber(prevPageNumber => prevPageNumber + 1)
          dispatch(productsListActions.setPageNumber(pageNumber + 1));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  ); // maybe error

  function handleSearch(e) {
    dispatch(productsListActions.setQuery(e.target.value));
    dispatch(productsListActions.setPageNumber(1));
    dispatch(productsListActions.setProducts([]));
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        style={{ marginTop: "3.5rem" }}
      >
        {/* <Grid
          container
          item
          xs={12}
          direction="row"
          justifyContent="center"
          alignItems="stretch"
        >
          <CategoryFilter />
        </Grid> */}

        {isProductListPage && (
          <Grid
            container
            item
            xs={12}
            direction="row"
            justifyContent="center"
            alignItems="stretch"
          >
            <CategoryFilter />
            <TextField
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="What are we looking for?"
              style={{ width: "50%", margin: "1rem" }}
            />
          </Grid>
        )}

        {(products.length === 0 && !loading ) ? <Grid sx={{marginTop: '4rem'}} container xs={12} justifyContent="center"><Alert severity="info">Nothing was found</Alert></Grid> : (
          products.map((product, index) => {
            if (products.length === index + 1) {
              return (
                <Grid
                  item
                  container
                  alignItems="stretch"
                  xs={12}
                  sm={6}
                  md={4}
                  key={product.id}
                >
                  <div
                    style={{ display: "flex" }}
                    ref={lastProductElementRef}
                    key={product.id}
                  >
                    <ProductCard product={product} />
                  </div>
                </Grid>
              );
            }
            return (
              <Grid
                item
                container
                alignItems="stretch"
                xs={12}
                sm={6}
                md={4}
                key={product.id}
              >
                <div style={{ display: "flex" }} key={product.id}>
                  <ProductCard product={product} />
                </div>
              </Grid>
            );
          })
        )}
        <Grid
          container
          item
          xs={12}
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <div style={{ margin: "3rem" }}>
            {loading && <CircularProgress color="secondary" />}
          </div>
          <div>
            {error && <Alert severity="warning">Something went wrong...</Alert>}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProductsList;
