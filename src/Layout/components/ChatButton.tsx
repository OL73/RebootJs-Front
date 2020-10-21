import { IconButton } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import ChatIcon from '@material-ui/icons/Chat';
import { DrawerContentString } from '../types';

interface ChatButtonProps {

    toggleDrawer: (content: DrawerContentString) => void;
}


const ChatButton: React.SFC<ChatButtonProps> = ({toggleDrawer}) => {
    return (
        <Link to="/conversation">
            <IconButton aria-label="conversation" onClick={e => toggleDrawer('conversations')}>
                <ChatIcon fontSize="large" />
            </IconButton>
        </Link>

    );
}

export default ChatButton;