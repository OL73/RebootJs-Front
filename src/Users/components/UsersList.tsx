import { List } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';
import { Loading } from '../../Layout/components/Loading';
import { IUser } from '../types';
import UsersListItem from './UsersListItem';

interface UsersListProps {
  users: IUser[];
  connectedUser?: IUser;
}

interface UsersListState {
  //users: IUser[]; avant d'utiliser redux
}

class UsersList extends React.Component<UsersListProps, UsersListState>{
  constructor(props: UsersListProps){
    super(props);
    this.state = {
      //users: [] avant d'utiliser redux
    }
  }

  componentDidMount(){
    /* getUsers().then(users =>{ avant d'utiliser redux ! logigue déplacée dans le component principale AppLayout
      this.setState({
        users: users
      })
    }) */
  }

  render(){

    const { users, connectedUser} = this.props;

    // on récupère tous les users à afficher sauf le user connecté
    const filteredUsers = users.filter(users => users._id !== connectedUser?._id );

    if(this.props.users.length === 0){
      return <Loading />

    } else {
      return <List>
        {filteredUsers.map((user, index) => 
          (<UsersListItem 
            key={index} 
            user={user} 
            connectedUser={this.props.connectedUser}
          />)
        )}
      </List>
    }
  }
}

const mapStoreToProps = (state:IAppState) => ({
users: state.users.list,
connectedUser: state.users.connectedUser
})

export default connect(mapStoreToProps)(UsersList);