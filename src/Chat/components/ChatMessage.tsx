import React from 'react';
import { IConversationMessage } from "../types";

export function ChatMessage({message} : {message:IConversationMessage}){

    
  return (
  <h5>{/* TODO Emitter: {message.emitter} -  */}Message: {message.content}</h5>
  )
}