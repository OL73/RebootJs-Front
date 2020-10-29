import { IConversationsState, IConversationsAction, UPDATE_CONVERSATIONS_LIST, UPDATE_CONVERSATION } from './types';

export function conversations(state: IConversationsState = defaultConversation(), action: IConversationsAction): IConversationsState {
    switch (action.type) {
        case UPDATE_CONVERSATIONS_LIST:
            return {
                ...state, 
                    list: action.conversations,
                    totalUnseenMessages: action.conversations.reduce((acc, conv) => acc + conv.unseenMessages, 0) // permet de cumuler le nombre de messages non lus
            }
        case UPDATE_CONVERSATION:
            return {
                ...state,
                list: [
                    ...state.list.filter(conv => conv._id !== action.conversation._id),
                    action.conversation
                ]
            }
        /* case UPDATE_POLLING_TIMER: ===> supprimé, utlisation du socket IO dans messagesRoutes côté back
            return {
                ...state,
                timer: action.timer
            } */
        default:
            return state;
    }

}

function defaultConversation() {

    return {
        list: [],
        totalUnseenMessages: 0
    }
}