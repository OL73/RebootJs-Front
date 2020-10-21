import { List } from '@material-ui/core';
import React from 'react';
import { getUsers } from '../../api/users';
import { IUser } from '../types';
import UsersListItem from './UsersListItem';

interface UsersListState {
  users: IUser[];
}

class UsersList extends React.Component<{}, UsersListState>{
  constructor(props: {}){
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    getUsers().then(users =>{
      this.setState({
        users: users
      })
    })
  }

  render(){
    if(this.state.users.length === 0){
      return <h1>Loading</h1>
    } else {
      return <List>
        {this.state.users.map((user, index) => <UsersListItem key={index} user={user} />)}
      </List>
    }
  }
}

export default UsersList;