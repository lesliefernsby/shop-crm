import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Box, IconButton, Typography, Button } from '@mui/material'
import { Menu, Lock, MeetingRoom, Person } from '@mui/icons-material'
// import useProductSearch from '../customHooks/useProductSearch'; Над переносом надо нормально подумать

const Navbar = () => {
  return (
    <AppBar>
      <Container maxWidth='lg'>

        <Toolbar disableGutters>

          <Box sx={{mr:1}}>
            <IconButton size='large' color='inherit'>
              <Menu />
            </IconButton>
          </Box>

            <Typography
            variant='h6'
            component='h1'
            noWrap
            sx={{flexGrow:1, display:{xs:'none', md:'flex'}}}
            >
              The Awesome Shop
            </Typography>

            <Typography
            variant='h6'
            component='h1'
            noWrap
            sx={{flexGrow:1, display:{xs:'flex', md:'none'}}}
            >
              Shop_m
            </Typography>


            
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
          href= "/">
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
