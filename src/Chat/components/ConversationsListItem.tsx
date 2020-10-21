import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { IConversation } from '../types';

export interface ConversationsListItemProps {
    conversation: IConversation;
}

const ConversationsListItem: React.FunctionComponent<ConversationsListItemProps> = ({ conversation }) => {
    return (
        <ListItem>
            <ListItemText
                primary={conversation._id}
                secondary={conversation.messages[0].content}
            />
        </ListItem>
    );
}

export default ConversationsListItem;