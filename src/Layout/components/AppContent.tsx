import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ChatScreen from '../../Chat/components/ChatScreen';
import LoginScreen from '../../Login/components/LoginScreen';
import ProfileScreen from './../../Users/components/ProfileScreen';
import UsersList from '../../Users/components/UsersList';
import { ErrorScreen } from './ErrorScreen';
import Todos from '../../todos/components/todos';
import ConversationsList from '../../Chat/components/ConversationsList';

class AppContent extends React.Component {
  render(){
    return (
      <Switch>
        <Route path="/login" component={LoginScreen} />
        <Route path="/users" component={UsersList} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/conversationsList" component={ConversationsList} />
        <Route path="/conversation/:conversationID" component={ChatScreen} />
        <Route exact path="/" component={Todos} />
        <Route><ErrorScreen errorMessage='Oops ! It seems like we did not find this page!'/></Route>
      </Switch>
    )
  }
}

export default AppContent;