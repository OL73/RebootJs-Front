import { createStyles, Theme, withStyles } from '@material-ui/core';
import React, { Fragment } from 'react';
import AppContent from './AppContent';
import AppDrawer, { drawerWidth } from './AppDrawer';
import AppMenu from './AppMenu';
import { DrawerContentString } from '../types';
import { makeFetchConnectedUser } from '../../Users/actions/makeFetchConnectedUser';
import { connect } from 'react-redux';
import { makeFetchUsersList } from '../../Users/actions/makeFetchUsersList';

interface AppLayoutState {
  drawerOpened: boolean;
  drawerContent?: DrawerContentString;
}

interface AppLayoutProps {
  classes: any;
  getConnectedUser: () => void;
  getUsers: () => void;
}

const style = (theme: Theme) => createStyles({
  content: {
    width: `100%`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
});

class AppLayout extends React.Component<AppLayoutProps, AppLayoutState> {
  constructor(props: AppLayoutProps){
    super(props);
    this.state = {
      drawerOpened: false,
    }
  }

  closeDrawer = () => {
    this.setState({
      drawerOpened: false
    })
  }

  toggleDrawer = (content: DrawerContentString) => {
    this.setState({
      drawerOpened: !this.state.drawerOpened,
      drawerContent: !this.state.drawerOpened ? content : undefined
    })
  }

  /* toggleChat = () => {
    this.setState({
      drawerOpened: !this.state.drawerOpened
    })
  } */
  componentDidMount() {
    this.props.getConnectedUser();
    this.props.getUsers();
  }

  render(){
    const contentClasses = [
      this.props.classes.content,
      this.state.drawerOpened && this.props.classes.contentShift
    ].join(" ");
    return (
      <Fragment>
        <div className={contentClasses}>
          <AppMenu 
            toggleDrawer={this.toggleDrawer}
          />
          <AppContent />
        </div>
        <AppDrawer
          open={this.state.drawerOpened}
          closeDrawer={this.closeDrawer}
          content={this.state.drawerContent}
        />
      </Fragment>
    )
  }
}

// TODO ThunkAction<void, IAppState, unknown, Action<string>>
const mapDispatchToProps = (dispatch: any) => ({
  getConnectedUser: () => { dispatch(makeFetchConnectedUser())}, // attention préaction avant l'updateUser
  getUsers: () => { dispatch(makeFetchUsersList())}
})

export default connect(undefined, mapDispatchToProps)(withStyles(style)(AppLayout));