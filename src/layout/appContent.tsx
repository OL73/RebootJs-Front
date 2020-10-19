import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginScreen from '../login/components/loginScreen';
import Todos from './../todos/components/todos';
import Users from './../users/components/users';

class AppContent extends React.Component {
  render(){
    return (
      <Switch>
        <Route path="/login" component={LoginScreen} />
        <Route path="/users" component={Users} />
        <Route path="/" component={Todos} />
      </Switch>
    )
  }
}

export default AppContent;