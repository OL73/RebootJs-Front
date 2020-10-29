import { Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { updateConversation } from '../../Chat/components/actions/updateConversation';
import { IConversation } from '../../Chat/types';
import history from '../../history';
import { IUser } from '../types';
import UserDetails from './UserDetails';

interface UsersListItemProps {
  user: IUser;
  connectedUser?: IUser;
  updateConversation: (conversation: IConversation) => void;
}

class UsersListItem extends React.Component<UsersListItemProps> {

  createConversation = (user: IUser) => {
    const { connectedUser } = this.props;
    if(!connectedUser) { return }

    // crée une conversation dans la liste des conversations
    const conversation : IConversation = {
      _id: generateConversationId(connectedUser._id, user._id),
      messages: [],
      targets: [user._id, connectedUser._id],
      updatedAt: new Date(),
      unseenMessages: 0
    };
    // on l'ajoute a la liste en dispatchant la bonne action
    this.props.updateConversation(conversation);

    history.push(`/conversation/${conversation._id}`);
  }

  render() {
    const user = this.props.user;
    return (
      <Button onClick={(_e) => this.createConversation(user)}>
        <UserDetails id={user._id} />
      </Button>
    )
  }
}

// pour générer un id de conversation avec la fonction btoa(...)
function generateConversationId(connectedUserId: string, targetId: string){
  return btoa(`${connectedUserId}_${targetId}_${new Date().toISOString()}`);
}

const mapDispatchToProps = (dispatch: any) => ({
updateConversation: (conversation: IConversation) => dispatch(updateConversation(conversation))
});

export default connect(undefined, mapDispatchToProps)(UsersListItem)