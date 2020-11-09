import { Button, Grid } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { IAppState } from '../../appReducer';
import { updateConversation } from '../../Chat/components/actions/updateConversation';
import { IConversation } from '../../Chat/types';
import history from '../../history';
import { IUser } from '../types';
import UserDetails from './UserDetails';

interface UsersListItemProps {
  user: IUser;
  connectedUser?: IUser;
  updateConversation: (conversation: IConversation) => void;
  conversations: IConversation[];
}

class UsersListItem extends React.Component<UsersListItemProps> {

  testExistingConversation = () => {

    for (let i = 0; i < this.props.conversations.length; i++) {

      for (const target of this.props.conversations[i].targets) {

        // on teste d'abord pour vérifier si le user existe déjà parmi les conversations existantes
        if (this.props.user._id === target) {
          console.log('une conversation existe déjà :', this.props.user._id);
          
          history.push(`/conversation/${this.props.conversations[i]._id}`);

          return;
        } 

        // si pas de conversations existantes on en crée une
        this.createConversation(this.props.user);
      }
    }
  }

  createConversation = (user: IUser) => {
    const { connectedUser } = this.props;
    if (!connectedUser) { return }

    // crée une conversation dans la liste des conversations
    const conversation: IConversation = {
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
      <Grid container direction='column'>
        {/* <Button onClick={(_e) => this.createConversation(user)}> */}
        <Button onClick={() => this.testExistingConversation()}>
          <UserDetails id={user._id} />
        </Button>
      </Grid>
    )
  }
}

// pour générer un id de conversation avec la fonction btoa(...)
function generateConversationId(connectedUserId: string, targetId: string) {
  return btoa(`${connectedUserId}_${targetId}_${new Date().toISOString()}`);
}

const mapStoreToProps = ({ conversations }: IAppState) => ({
  conversations: conversations.list
})

const mapDispatchToProps = (dispatch: any) => ({
  updateConversation: (conversation: IConversation) => dispatch(updateConversation(conversation))
});

export default connect(mapStoreToProps, mapDispatchToProps)(UsersListItem)