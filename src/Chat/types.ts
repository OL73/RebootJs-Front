export interface IConversation {
  _id: string;
  targets: string[];
  updatedAt: Date;
  unseenMessages: number;
  messages: IConversationMessage[];
}

export interface IConversationMessage {
  conversationId: string;
  _id: string;
  emitter: string;
  content: string;
  createdAt: Date;
  targets: string[];
}

export interface IConversationsState {
  list: IConversation[],
  totalUnseenMessages: number;
  /* timer?: NodeJS.Timer ===> supprimé, utlisation du socket IO dans messagesRoutes côté back */
}

export const UPDATE_CONVERSATIONS_LIST = 'UPDATE_CONVERSATIONS_LIST';
export const UPDATE_CONVERSATION = 'UPDATE_CONVERSATION';
/* export const UPDATE_POLLING_TIMER = 'UPDATE_POLLING_TIMER'; ===> supprimé, utlisation du socket IO dans messagesRoutes côté back */

export interface IUpdateConversationsListAction {

  type: typeof UPDATE_CONVERSATIONS_LIST,
  conversations: IConversation[]
}

export interface IUpdateConversationAction {
  type: typeof UPDATE_CONVERSATION,
  conversation: IConversation
}

/* export interface IUpdatePollingTimerAction { ===> supprimé, utlisation du socket IO dans messagesRoutes côté back
  type: typeof UPDATE_POLLING_TIMER,
  timer: NodeJS.Timeout;
} */

/* ===> fichier updatePollingTimer.ts supprimé, utlisation du socket IO dans messagesRoutes côté back
import { IUpdatePollingTimerAction, UPDATE_POLLING_TIMER } from "./../../types";

export function updatePollingTimer(timer: NodeJS.Timeout): IUpdatePollingTimerAction{
  return {
    type: UPDATE_POLLING_TIMER,
    timer: timer
  }
} */

export type IConversationsAction = 
  IUpdateConversationsListAction 
  | IUpdateConversationAction;
  /* | IUpdatePollingTimerAction ===> supprimé, utlisation du socket IO dans messagesRoutes côté back */