import { List } from '@material-ui/core';
import UserDetails from '../../Users/components/UserDetails'
import React from 'react';

export function AttendeesList({users} : {users: string[]}){
  return <List>
    {users.map((userId,index) => <UserDetails key={index} id={userId} />)}
  </List>
}