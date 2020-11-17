import { Badge, IconButton } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import ChatIcon from '@material-ui/icons/Chat';
import { DrawerContentString } from '../types';
import { IAppState } from '../../appReducer';
import { connect } from 'react-redux';

interface ChatButtonProps {

    toggleDrawer: (content: DrawerContentString) => void;
    unseenMessage: number;
}


const ChatButton: React.FunctionComponent<ChatButtonProps> = ({ toggleDrawer, unseenMessage }) => {
    return (

        <Link to="/">
            <Badge badgeContent={unseenMessage} color="secondary">
                <IconButton aria-label="conversation" onClick={e => toggleDrawer('conversations')}>
                    <ChatIcon fontSize="large" style={ {color: 'white'} }/>
                </IconButton>
            </Badge>
        </Link>
    );
}

const mapStateToProps = ({ conversations }: IAppState) => ({
    unseenMessage: conversations.totalUnseenMessages
})

export default connect(mapStateToProps)(ChatButton);