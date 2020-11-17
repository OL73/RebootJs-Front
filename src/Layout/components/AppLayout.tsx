import { createStyles, Theme, withStyles } from '@material-ui/core';
import React, { Fragment } from 'react';
import AppContent from './AppContent';
import AppDrawer, { drawerWidth } from './AppDrawer';
import AppMenu from './AppMenu';
import { DrawerContentString } from '../types';
import WelcomeUser from './WelcomeUser';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';
import { IUser } from '../../Users/types';
import Footer from '../Footer';

interface AppLayoutState {
  drawerOpened: boolean;
  drawerContent?: DrawerContentString;
  // timer?: NodeJS.Timeout; ===============> logique déplacée dans makeInitApp()
}

interface AppLayoutProps {
  classes: any;
  /* getConnectedUser: () => void; ===============> logique déplacée dans makeInitApp()
  getUsers: () => void;
  getConversationsList: () => void; */
  connectedUser?: IUser;
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

  // TODO refacto InitApp avec toutes les get...
  /* componentDidMount() {  ===============> logique déplacée dans makeInitApp()
    this.props.getConnectedUser();
    this.props.getUsers();
    this.props.getConversationsList();

    this.setState({
      timer: setInterval(() => { this.props.getConversationsList() }, 3000)
    });
  }

  componentWillUnmount() {
    if(this.state.timer) { clearInterval(this.state.timer) };
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
          <WelcomeUser 
            connectedUser={this.props.connectedUser}
          />
          <AppContent />
          <Footer />
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

const mapStoreToProps = ({users}: IAppState) => ({
  connectedUser: users.connectedUser
})

// TODO ThunkAction<void, IAppState, unknown, Action<string>>
/* const mapDispatchToProps = (dispatch: any) => ({ ===============> logique déplacée dans makeInitApp()
  getConnectedUser: () => { dispatch(makeFetchConnectedUser())}, // attention préaction avant l'updateUser
  getUsers: () => { dispatch(makeFetchUsersList())},
  getConversationsList: () => { dispatch(makeFetchConversationsList())}
}) */

// export default connect(undefined, mapDispatchToProps)(withStyles(style)(AppLayout)); ===============> logique déplacée dans makeInitApp()
export default connect(mapStoreToProps)(withStyles(style)(AppLayout));