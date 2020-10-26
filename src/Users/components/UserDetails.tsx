import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import { connect } from 'react-redux';
import React from 'react';
import { IAppState } from '../../appReducer';
import { IUser } from '../types';

interface UserDetailsProps {
  user: IUser
}

interface UserDetailsPropsGiven {
  id: string
}

function UserDetails({user} : UserDetailsProps){
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

const mapStateToProps = (store: IAppState, props: UserDetailsPropsGiven) => {
  return {
    user: store.users.list.find(user => user._id === props.id) || { _id: "", firstname: 'Unknown', lastname: 'User', email: "usernotfound", conversationsSeen: {} }
  }
}

export default connect(mapStateToProps)(UserDetails);