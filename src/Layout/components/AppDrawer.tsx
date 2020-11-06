import { makeStyles, Theme, createStyles, Drawer, Divider, IconButton } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import React from 'react';
import UsersList from '../../Users/components/UsersList';
import { Alert } from './Alert';
import { DrawerContentString } from '../types';
import ConversationsList from '../../Chat/components/ConversationsList';

interface DrawerProps {
  open: boolean,
  closeDrawer: () => void;
  content?: DrawerContentString;
}

export const drawerWidth = 350;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerHeader: {
      heigth: '50px',
      textAlign: 'right',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: theme.palette.background.paper,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    paper: {
      width: drawerWidth,
    },
    drawerContent: {
      height: 'calc(100% - 50px)',
    }
  })
)

function AppDrawer({ open, closeDrawer, content }: DrawerProps){
  const classes = useStyles();

  let contentComponent: any;
  
  if(content === "users"){

    contentComponent = <UsersList />

  } else if (content === "conversations") {

    contentComponent = <ConversationsList />

  } else {

    contentComponent = <Alert status='error' error="Drawer content invalid"/>
  }

  return (

    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      onClose={closeDrawer}
      classes={{
        paper: classes.paper,
      }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={closeDrawer}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        {contentComponent}
    </Drawer>
  )
}

export default AppDrawer;