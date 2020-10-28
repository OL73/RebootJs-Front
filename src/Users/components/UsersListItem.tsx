import React from 'react';
import { IUser } from '../types';
import UserDetails from './UserDetails';

interface UsersListItemProps{
  user: IUser;
}

class UsersListItem extends React.Component<UsersListItemProps> {
  render(){
    const user = this.props.user;
    return (
      <UserDetails id={user._id} />
    )
  }
}

export default UsersListItem;