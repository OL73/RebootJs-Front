import { List } from '@material-ui/core';
import UserDetails from '../../Users/components/UserDetails'
import React from 'react';

export interface AttendeesListProps {
  users: string[];
  connectedUser?: string;
}

export function AttendeesList({users, connectedUser}: AttendeesListProps){

  const filteredUsers = users.filter(users => users !== connectedUser);


  return <List>
    {filteredUsers.map((userId,index) => <UserDetails key={index} id={userId}/>)}
  </List>
}