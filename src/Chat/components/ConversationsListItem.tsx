import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { IConversation } from '../types';

export interface ConversationsListItemProps {
    conversation: IConversation;
    onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ConversationsListItem: React.FunctionComponent<ConversationsListItemProps> = ({ conversation, onClick }) => {
    return (
        <ListItem >
            <ListItemText
                primary={conversation._id}
                secondary={conversation.messages[0].content}
                onClick={onClick}
            />
        </ListItem>
    );
}

export default ConversationsListItem;