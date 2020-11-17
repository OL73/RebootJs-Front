import { makeStyles, Theme, createStyles, Drawer, Divider, IconButton } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import React from 'react';
import UsersList from '../../Users/components/UsersList';
import { DrawerContentString } from '../types';
import ConversationsList from '../../Chat/components/ConversationsList';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';
import { IConversation } from '../../Chat/types';
import Alert from '@material-ui/lab/Alert';
import { IUser } from '../../Users/types';
import { Link } from 'react-router-dom';

interface DrawerProps {
  open: boolean,
  closeDrawer: () => void;
  content?: DrawerContentString;
  conversations: IConversation[];
  connectedUser?: IUser;
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

function AppDrawer({ open, closeDrawer, content, conversations, connectedUser }: DrawerProps) {
  const classes = useStyles();

  let contentComponent: any;

  if (content === "users") {

    contentComponent = <UsersList />

  } else if (content === "conversations" && connectedUser) {

    if (conversations.length > 0) {

      contentComponent = <ConversationsList />
    } else {

      contentComponent = <Alert severity='info'>Vous n'avez pas encore de conversation...</Alert>
    }

  } else {

    contentComponent = <Alert severity='warning'>Please, login <Link to='/login'>here</Link> !</Alert>
    //contentComponent = <Alert status='error' error="Drawer content invalid"/>
    //contentComponent = <Loading/>
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

const mapStoreToProps = ({ users, conversations }: IAppState) => ({
  conversations: conversations.list,
  connectedUser: users.connectedUser
})

export default connect(mapStoreToProps)(AppDrawer);