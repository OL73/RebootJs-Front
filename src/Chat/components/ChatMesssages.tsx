import React from 'react';
import { IConversationMessage } from '../types';
import {ChatMessage} from './ChatMessage';

export function ChatMessages({messages} :{messages : IConversationMessage[]}){
  return (
    <ul>
      {messages.map((message, index) => <ChatMessage key={index} message={message} />)}
    </ul>
  )
}