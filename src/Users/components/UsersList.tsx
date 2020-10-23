import { List } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../api/users';
import { IAppState } from '../../appReducer';
import { makeFetchUsersList } from '../actions/makeFetchUsersList';
import { IUser } from '../types';
import UsersListItem from './UsersListItem';

interface UsersListProps {
  users: IUser[];
}

interface UsersListState {
  //users: IUser[];
}

class UsersList extends React.Component<UsersListProps, UsersListState>{
  constructor(props: UsersListProps){
    super(props);
    this.state = {
      //users: []
    }
  }

  componentDidMount(){
    /* getUsers().then(users =>{
      this.setState({
        users: users
      })
    }) */
  }

  render(){
    if(this.props.users.length === 0){
      return <h1>Loading</h1>
    } else {
      return <List>
        {this.props.users.map((user, index) => <UsersListItem key={index} user={user} />)}
      </List>
    }
  }
}

const mapStoreToProps = (state:IAppState) => ({
users: state.users.list
})

export default connect(mapStoreToProps)(UsersList);