import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IAppState } from '../../appReducer';
import { IUser } from '../../Users/types';

export interface ProfileButtonProps {
  connectedUser?: IUser
}

const ProfileButton: React.FunctionComponent<ProfileButtonProps> = ({ connectedUser }) => {

  if (!connectedUser) {

    return (
      <Link to="/login">
        <IconButton aria-label="login">
          <LockOpenTwoToneIcon fontSize="large" />
        </IconButton>
      </Link>
    )
  }

  return (
    <Link to="/profile">
      <IconButton aria-label="profile">
        <AccountCircle fontSize="large" />
      </IconButton>
    </Link>
  )
}

const mapStoreToProps = (state: IAppState) => ({
  connectedUser: state.users.connectedUser
})

export default connect(mapStoreToProps)(ProfileButton);