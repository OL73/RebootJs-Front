import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class AppMenu extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <AccountCircleIcon />
          </IconButton>
          <Typography variant="h6">
            <Link color="" to="/">Flint Messenger</Link>
          </Typography>
          <Button><NavLink to="/login">Login</NavLink></Button>
          {/* <Button><Link color="inherit" to="/login">Login</Link></Button> */}
        </Toolbar>
      </AppBar>
    )
  }
}

export default AppMenu;