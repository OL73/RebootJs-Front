import { IAppState } from './../../../appReducer';
import { updateConversationsList } from './updateConversationsList';

export function makeVerifyUnseenMessages() {
    console.log('fonction makeVerifyUnseenMessages() appelée');
    

    return (dispatch: any, getState: () => IAppState) => {

        const conversations = getState().conversations.list;
        const connectedUser = getState().users.connectedUser;

        if (!connectedUser)  { return }

        const updatedConversations = conversations.map(conversation => {

            // cas où le new user n'a pas encore de lastSeenDate
            // vérification nécessaire si new user avec une conversation créée par un autre user
            if (!connectedUser.conversationsSeen) {
                connectedUser.conversationsSeen = {
                    [`${conversation._id}`]: new Date(Date.now())
                }
            }
            
            const lastSeenDate = connectedUser.conversationsSeen[conversation._id];
            let unseenMessages;
            if (!lastSeenDate) {
                unseenMessages = conversation.messages.length; // 0
            } else {
                unseenMessages = conversation.messages
                    .filter(message => new Date(message.createdAt) > new Date(lastSeenDate))
                    .length
            }
            conversation.unseenMessages = unseenMessages;
            return conversation
        })

        dispatch(updateConversationsList(updatedConversations));
    }

    
}

