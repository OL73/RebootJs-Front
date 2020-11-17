import { AppBar, Toolbar, Typography, Grid, Hidden } from '@material-ui/core';
import CommentIcon from '@material-ui/icons/Comment';
import React from 'react';
import { ContactListButton } from './ContactListButton';
import ProfileButton from './ProfileButton';
import { DrawerContentString } from '../types';
import ChatButton from './ChatButton';
import { Link } from 'react-router-dom';

interface AppMenuProps {

  toggleDrawer: (content: DrawerContentString) => void;
}

const AppMenu: React.SFC<AppMenuProps> = ({ toggleDrawer }) => {

  return (
    <AppBar position="static" style={{ height: '10vh' }}>
      <Grid container justify="space-between" alignItems="center" style={{ height: '100%' }}>
        <Grid item>
          <Link
            to="/"
            style={ { textDecoration: 'none', color: 'white'} }
          >
            <Toolbar>
              <CommentIcon fontSize="large" />
              <Typography variant="h4">answerMe</Typography>
            </Toolbar>
          </Link>
        </Grid>
        <Grid item>
          <Toolbar>
            <Hidden xsDown>
              <ChatButton toggleDrawer={toggleDrawer} />
              <ContactListButton toggleDrawer={toggleDrawer} />
              <ProfileButton />
            </Hidden>
          </Toolbar>
        </Grid>
      </Grid>
    </AppBar>
  )
}

export default AppMenu;