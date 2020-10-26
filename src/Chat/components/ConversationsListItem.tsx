import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { IConversation } from '../types';

export interface ConversationsListItemProps {
    conversation: IConversation;
}

const ConversationsListItem: React.FunctionComponent<ConversationsListItemProps> = ({ conversation }) => {
    return (
        <ListItem
            divider
            button
            component={Link}
            to={`/conversation/${conversation._id}`}
            key={conversation._id}>
            <ListItemText
                primary={conversation._id}
                secondary={conversation.messages[0].content}
            />
        </ListItem>
    );
}

export default ConversationsListItem;