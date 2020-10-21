import { createStyles, Theme, withStyles } from '@material-ui/core';
import React, { Fragment } from 'react';
import AppContent from './AppContent';
import AppDrawer, { drawerWidth } from './AppDrawer';
import AppMenu from './AppMenu';
import { DrawerContentString } from '../types';

interface AppLayoutState {
  drawerOpened: boolean;
  drawerContent?: DrawerContentString;
}

interface AppLayoutProps {
  classes: any;
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

export default withStyles(style)(AppLayout);