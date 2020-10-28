import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import { connect } from 'react-redux';
import React from 'react';
import { IAppState } from '../../appReducer';
import { IUser } from '../types';
import { StyledBadge } from './StyledBadge';

interface UserDetailsProps {
  user: IUser
}

interface UserDetailsPropsGiven {
  id: string
}

function UserDetails({ user }: UserDetailsProps) {
  
  let avatar;
  if (user.status === "online") {
    avatar = 
    <StyledBadge
      overlap="circle"
      anchorOrigin={{
      vertical: 'bottom',
       horizontal: 'right',
      }}
       variant="dot"
    >
      <Avatar>
        {user.firstname[0]}{user.lastname[0]}
      </Avatar>
    </StyledBadge>
  } else {
    avatar = <Avatar> {user.firstname[0]}{user.lastname[0]} </Avatar>
  }


  return (
    <ListItem>
      <ListItemAvatar>
        {avatar}
      </ListItemAvatar>
      <ListItemText
        primary={`${user.firstname} ${user.lastname}`}
      />
    </ListItem>
  )
}

const mapStateToProps = (store: IAppState, props: UserDetailsPropsGiven) => {
  return {
    user: store.users.list.find(user => user._id === props.id) || { _id: "", firstname: 'Unknown', lastname: 'User', email: "usernotfound", conversationsSeen: {} ,status:'offline'}
  }
}

export default connect(mapStateToProps)(UserDetails);