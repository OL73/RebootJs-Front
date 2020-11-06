import { AppBar, Toolbar, Typography, Grid, Hidden } from '@material-ui/core';
import { Forum } from '@material-ui/icons';
import React from 'react';
import { ContactListButton } from './ContactListButton';
import ProfileButton from './ProfileButton';
import { DrawerContentString } from '../types';
import ChatButton from './ChatButton';
import { connect } from 'react-redux';

interface AppMenuProps {

  toggleDrawer: (content: DrawerContentString) => void;
  firstname?: string;
}

const AppMenu: React.SFC<AppMenuProps> = ({ toggleDrawer, firstname }) => {

  return (
    <AppBar position="static" style={{ height: '10vh' }}>
      <Grid container justify="space-between" alignItems="center" style={{ height: '100%' }}>
        <Grid item>
          <Toolbar>
            <Forum fontSize="large" />
            <Typography variant="h3">ola</Typography>
          </Toolbar>
        </Grid>
        <Grid item>
          <Typography>{firstname}</Typography>
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

const mapStateToProps = (state: any) => ({
  firstname: state.users.connectedUser?.firstname
})

export default connect(mapStateToProps)(AppMenu);