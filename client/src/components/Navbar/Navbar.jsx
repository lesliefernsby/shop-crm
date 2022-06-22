import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AppBar, Container, Toolbar, Box, IconButton, Typography, Button } from '@mui/material'
import { Menu, Lock, MeetingRoom, Person } from '@mui/icons-material'

const Navbar = (props) => {

  const loggedIn = useSelector(state => state.authentication.loggedIn);
  // console.log('isLogged', loggedIn)
  const user = useSelector(state => state.authentication.user);
  // console.log('user', user)
  const {query, setQuery, setPageNumber} = props

 function handleSearch(e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return (
    <AppBar>
      <Container maxWidth='lg'>

        <Toolbar disableGutters>

          <Box sx={{mr:1}}>
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
            sx={{flexGrow:1, display:{xs:'none', md:'flex'}}}
            style={{ minWidth: '20%', margin: '0.5rem' }}
            >
              The Top Shop
            </Typography>

            <Typography
            variant='h6'
            component='h2'
            noWrap
            sx={{flexGrow:1, display:{xs:'flex', md:'none'}}}
            >
              TTS
            </Typography>

            <Grid container
          item xs={12}
          direction="row"
          justifyContent="center"
          alignItems="stretch">
          <TextField 
          type="text" 
          value={query} 
          onChange={handleSearch} 
          placeholder={'What are we looking for?'} 
          style={{ minWidth: '20%', margin: '0.3rem' }}>
          </TextField>
            </Grid>
            
        
       { (!loggedIn)?<>
       <Link className='NavLink' to={"/login"}>
          <Button 
          color='inherit'
          startIcon={<Lock />}
          >
          Login
          </Button>
        </Link> 
        </> : ''}
         
         
            { (loggedIn)?<>
              <Link className='NavLink' to={"/"}>
            <Button 
          color='inherit'
          startIcon={<Person />}
          href= "/">
          {user.firstName}
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
          </> : ''}
         

        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
