import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CssBaseline, Button, List, ListItem, Divider } from "@mui/material";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import { productsListActions } from "../../redux/actions/productsListActions";
import ProductCard from "../ProductCard/ProductCard";

function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.productsList.favorites);
  const likes = useSelector((state) => state.productsList.likes);
  const error = useSelector((state) => state.productsList.error);
  const loading = useSelector((state) => state.productsList.pending);

  useEffect(() => {
    dispatch(productsListActions.getFavorites());
  }, [likes]);

  return (
    <Container maxWidth="lg">
      <CssBaseline />

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          style={{ marginTop: "3.5rem" }}
        >
          {favorites.map((fav) => (
            <Grid
              item
              container
              alignItems="stretch"
              xs={12}
              sm={6}
              md={4}
              key={fav.id}
            >
              <ProductCard product={fav} />
            </Grid>
          ))}

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
              {error && (
                <Alert severity="warning">Something went wrong...</Alert>
              )}
            </div>
          </Grid>
        </Grid>
      </Box>

      <Divider />

      <List>
        <ListItem>
          <Link to="/personal">
            <Button variant="contained">Your profile</Button>
          </Link>

          <Link to="/">
            <Button variant="text" style={{ marginLeft: "1rem" }}>
              To main page
            </Button>
          </Link>
        </ListItem>
      </List>
    </Container>
  );
}

export default Favorites;
