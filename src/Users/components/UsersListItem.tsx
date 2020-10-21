import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import React from 'react';
import { IUser } from '../types';

interface UsersListItemProps{
  user: IUser;
}

class UsersListItem extends React.Component<UsersListItemProps> {
  render(){
    const user = this.props.user;
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            {user.firstname[0]}{user.lastname[0]}
          </Avatar>
        </ListItemAvatar>
        
        <ListItemText
          primary={`${user.firstname} ${user.lastname}`}
        />
      </ListItem>
    )
  }
}




export default UsersListItem;