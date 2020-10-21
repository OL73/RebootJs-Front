import IconButton from '@material-ui/core/IconButton';
import Contacts from '@material-ui/icons/Contacts';
import React from 'react';
import { DrawerContentString } from '../types';

export function ContactListButton({ toggleDrawer }: {toggleDrawer: (content: DrawerContentString) => void}) {
  return (
    <IconButton aria-label="contacts" onClick={e => toggleDrawer("users")}>
      <Contacts fontSize="large" />
    </IconButton>
  );
}