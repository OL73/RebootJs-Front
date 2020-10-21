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