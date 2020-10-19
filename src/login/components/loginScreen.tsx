import { AppBar, Tabs, Tab } from '@material-ui/core';
import React, { Fragment } from 'react';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import TabPanel from './tabPanel';

interface LoginScreenState{
  selectedTab: number;
}

class LoginScreen extends React.Component<{}, LoginScreenState> {
  constructor(props: {}){
    super(props);

    this.state = {
      selectedTab: 0
    }
  }

  handleChange = (_: React.ChangeEvent<{}>, newTab: number) => {
    this.setState({selectedTab: newTab})
  }

  render(){
    const selectedTab = this.state.selectedTab;
    return (
    <Fragment>
      <AppBar position="static">
        <Tabs value={selectedTab} onChange={this.handleChange} aria-label="simple tabs example">
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
      </AppBar>
      <TabPanel value={selectedTab} index={0}>
        <LoginForm />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <RegisterForm />
      </TabPanel>
    </Fragment>)
  }
}

export default LoginScreen;