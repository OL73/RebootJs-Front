import { TextField } from '@material-ui/core';
import React from 'react';
import { IConversationMessage } from '../types';
import ChatMessage from './ChatMessage';

export interface ChatMessagesProps {

    messages: IConversationMessage[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {


    return (
        <div>
            {messages.map(elts => (
                <ChatMessage
                    key={elts._id}
                    content={elts.content}
                />
            ))}
            <TextField
            label="Send a message..."
            variant="outlined"
            fullWidth={true}
            //onChange={(e) => this.props.handleChange("email", e.target.value)}
            />
        </div>

    )

}

export default ChatMessages;