import { IConversationMessage } from './../../Chat/types';
import { IAppState } from './../../appReducer';
import { IUser } from './../../Users/types';
import io from 'socket.io-client';
import { makeUpdateUser } from '../../Users/actions/makeUpdateUser';
import { updateConversation } from '../../Chat/components/actions/updateConversation';

export function makeStartSocket(){
  return (dispatch: any, getState: () => IAppState) => {
    const socketServer = io.connect('http://localhost:3000');

    socketServer.on('connect', () => {
      console.log('Je suis bien connecté au back');
    })

    /* socketServer.on('mon-super-event', (data: any) => {
      console.log(data);
    }) */

    // reponse au socket emit dans le route post /api/messages côté back
    socketServer.on('new-message', ({message}: {message: IConversationMessage}) => {
      const conversations = getState().conversations.list;
      
      // on récupère la conversation de la liste qui correspond au conversationId reçu par la socket
      const conversation = conversations.find(conv => conv._id === message.conversationId);

      // TODO Quid quand la conv n'existe pas
      if(!conversation) { return }

      // on récupère les messages d'avant et on les remplace par les anciens + les nouveaux...
      const newConversation = { 
        ...conversation,
        messages: [...conversation.messages, message]
      }
      dispatch(updateConversation(newConversation));
    })

    // reponse au socket pour indiquer le status du user et mise à jour du user
    socketServer.on('user-status-update', ({user}: {user: IUser}) => {
        console.log(user);
        dispatch(makeUpdateUser(user));
      })
  }
}