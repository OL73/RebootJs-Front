import { Box, Button, Grid, TextField } from '@material-ui/core';
import React from 'react';
import { IConversationMessage } from '../types';
import ChatMessage from './ChatMessage';

export interface ChatMessagesProps {

    messages: IConversationMessage[];
    onChange: (newMessage: string) => void;
    onSubmit: () => void;
}

export function ChatMessages({ messages, onChange, onSubmit }: ChatMessagesProps) {


    return (
        <div>
            {messages.map(elts => (
                <ChatMessage
                    key={elts._id}
                    content={elts.content}
                />
            ))}
            <form onSubmit={onSubmit}>
            <TextField
            label="Send a message..."
            variant="outlined"
            fullWidth={true}
            onChange={(e) => onChange(e.target.value)}
            />
            <Box style={{margin: "2rem 0"}}>
            <Grid container justify="flex-end">
              <Grid item xs={4}>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Envoyer
                </Button>
              </Grid>
            </Grid>
          </Box>
          </form>
        </div>

    )

}

export default ChatMessages;