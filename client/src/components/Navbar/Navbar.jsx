import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AppBar, Container, Toolbar, Box, IconButton, Typography, Button } from '@mui/material'
import { Menu, Lock, MeetingRoom, Person } from '@mui/icons-material'
import { useSelector } from 'react-redux';


const Navbar = (props) => {
  const isProductListPage = useSelector((state) => state.productsList.isProductListPage);
  const { query, setQuery, setPageNumber } = props

  function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return (
    <AppBar>
      <Container maxWidth='lg'>

        <Toolbar disableGutters>

          <Box sx={{ mr: 1 }}>
            <Link className='NavLink' to={"/"}>
              <IconButton size='large' color='inherit'>
                <Menu />
              </IconButton>
            </Link>
          </Box>

          <Typography
            variant='h6'
            component='h2'
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
          >
            The Awesome Shop  (of all the shops teh)
          </Typography>

          <Typography
            variant='h6'
            component='h2'
            noWrap
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            the_m
          </Typography>

          {isProductListPage && <Grid container
            item xs={12}
            direction="row"
            justifyContent="center"
            alignItems="stretch">
            <TextField
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder={'What are we looking for?'}
              style={{ minWidth: '20%', margin: '0.5rem' }}>
            </TextField>
          </Grid>}

          {/* unlogged */}
          <Link className='NavLink' to={"/login"}>
            <Button
              color='inherit'
              startIcon={<Lock />}
            >
              Login
            </Button>
          </Link>

          {/* /unlogged */}

          {/* logged */}
          <Link className='NavLink' to={"/"}>
            <Button
              color='inherit'
              startIcon={<Person />}
              href="/">
              username
            </Button>
          </Link>

          <Link className='NavLink' to={"/checkout"}>
            <Button
              color='inherit'
              startIcon={<MeetingRoom />}
            >
              Logout
            </Button>
          </Link>
          {/* /logged */}

        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
