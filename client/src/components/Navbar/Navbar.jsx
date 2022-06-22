import React from 'react'
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
          <Button 
          color='inherit'
          startIcon={<Lock />}
          href= "/login"
          >
          Login
          </Button>

          {/* <Button 
          color='inherit'
          startIcon={<ExitToApp />}
          >
          Sign In
          </Button> */}
            {/* /unlogged */}

            {/* logged */}
            <Button 
          color='inherit'
          startIcon={<Person />}
          href= "/">
          username
          </Button>

            <Button 
          color='inherit'
          startIcon={<MeetingRoom />}
          href= "/checkout">
          Logout
          </Button>
          {/* /logged */}

        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
