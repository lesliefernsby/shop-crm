import React from 'react';
import { Menu, ListItemIcon, MenuItem } from '@mui/material';
import { Logout, Settings } from '@mui/icons-material';


const UserMenu = ({anchorUserMenu, setAnchorUserMenu}) => {

  // const {dispatch} = useValue
const handleCloseUserMenu = () => {
  setAnchorUserMenu(null)
}

  return (
    <Menu
    anchorEl={anchorUserMenu}
    open={Boolean(anchorUserMenu)}
    onClose={handleCloseUserMenu}
    onClick={handleCloseUserMenu}
    >
      {/* <MenuItem onClick={()=>dispatch({type:'UPDATE_USER', payload: null })}> */}
      <MenuItem>
      <ListItemIcon>
        <Settings fontSize='small' />
      </ListItemIcon>
      Profile
      </MenuItem>

      <MenuItem>
      <ListItemIcon>
        <Logout fontSize='small' />
      </ListItemIcon>
      Logout
      </MenuItem>
    </Menu>
  )
}

export default UserMenu
