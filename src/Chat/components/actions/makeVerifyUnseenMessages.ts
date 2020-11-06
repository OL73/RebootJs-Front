import { IAppState } from './../../../appReducer';
import { updateConversationsList } from './updateConversationsList';

export function makeVerifyUnseenMessages() {

    return (dispatch: any, getState: () => IAppState) => {

        const conversations = getState().conversations.list;
        const connectedUser = getState().users.connectedUser;

        if (!connectedUser)  { return }

        const updatedConversations = conversations.map(conversation => {
            const lastSeenDate = connectedUser.conversationsSeen[conversation._id]
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

