import { IConversation, IUpdateConversationAction, UPDATE_CONVERSATION } from "./../../types";

export function updateConversation(conversation: IConversation): IUpdateConversationAction {
  return {
    type: UPDATE_CONVERSATION,
    conversation: conversation
  }
}