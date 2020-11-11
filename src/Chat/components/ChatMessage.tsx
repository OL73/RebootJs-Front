import React from 'react';
import { IUser } from '../../Users/types';
import { IConversationMessage } from "../types";

export interface ChatMessageProps {

  message: IConversationMessage;
  users: IUser[];
}

const ChatMessage = ({ message, users }: ChatMessageProps) => {

  const user = users.find(user => user._id === message.emitter);

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};

  return (
    <div>
      <h4 style={ {textTransform: "capitalize"} }>
        {`${user?.firstname} ${user?.lastname} `}
        <span style={ {color: "#9e9a9a", fontSize: "12px", textTransform: "lowercase", fontWeight: 'lighter'} }>
          {` ${new Date(message.createdAt).toLocaleString('fr-FR', options)}`}
        </span>
      </h4>
      <p>{message.content}</p>
    </div>
  )
}

export default ChatMessage;