import { Tabs, Tab, Container } from '@material-ui/core';
import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import TabPanel from './TabPanel';

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
    <Container maxWidth="lg" style={{marginTop: '2rem'}} >
      <Tabs
        value={selectedTab}
        onChange={this.handleChange}
        variant="fullWidth"
      >
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>
      <TabPanel value={selectedTab} index={0}>
        <LoginForm />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <RegisterForm />
      </TabPanel>
    </Container>)
  }
}

export default LoginScreen;