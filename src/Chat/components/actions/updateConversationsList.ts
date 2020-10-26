import { IConversation, UPDATE_CONVERSATIONS_LIST, IUpdateConversationsListAction } from './../../types';

export function updateConversationsList(conversations: IConversation[]): IUpdateConversationsListAction {
    return {
        type: UPDATE_CONVERSATIONS_LIST,
        conversations: conversations
    }
}