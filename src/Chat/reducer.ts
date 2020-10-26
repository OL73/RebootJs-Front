import { IConversationsState, IConversationsAction, UPDATE_CONVERSATIONS_LIST, UPDATE_CONVERSATION, UPDATE_POLLING_TIMER } from './types';

export function conversations(state: IConversationsState = defaultConversation(), action: IConversationsAction): IConversationsState {
    switch (action.type) {
        case UPDATE_CONVERSATIONS_LIST:
            return {
                ...state, list: action.conversations
            }
        case UPDATE_CONVERSATION:
            return {
                ...state,
                list: [
                    ...state.list.filter(conv => conv._id !== action.conversation._id),
                    action.conversation
                ]
            }
        case UPDATE_POLLING_TIMER:
            return {
                ...state,
                timer: action.timer
            }
        default:
            return state;
    }

}

function defaultConversation() {

    return {
        list: []
    }
}