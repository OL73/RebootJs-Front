import { ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IAppState } from '../../appReducer';
import { IUser } from '../../Users/types';
import { IConversation } from '../types';
import { makeVerifyUnseenMessages } from './actions/makeVerifyUnseenMessages';

export interface ConversationsListItemProps {
    conversation: IConversation;
    verifyUnseenMessage: () => void;
    users: IUser[];
    connectedUser?: IUser;
}

const ConversationsListItem: React.FunctionComponent<ConversationsListItemProps> = ({ conversation, verifyUnseenMessage, users, connectedUser }) => {
    
    const emitter = conversation.messages[conversation.messages.length - 1].emitter;

    let whoSentLastMessage: IUser | undefined;
    
    if (users && connectedUser) {
        whoSentLastMessage = users.find(user => user._id === emitter);

        if (whoSentLastMessage?._id === connectedUser?._id) {
            whoSentLastMessage = connectedUser;
            whoSentLastMessage.lastname = 'me';
            //whoSentLastMessage.firstname = '';
        }
    }

    
    return (
        <ListItem
            divider
            button
            component={Link}
            to={`/conversation/${conversation._id}`}
            onClick={verifyUnseenMessage}
            key={conversation._id}>
            <ListItemText
                primary={`from: ${whoSentLastMessage?.lastname[0].toUpperCase().concat(whoSentLastMessage?.lastname.slice(1,))} ${whoSentLastMessage?.firstname[0].toUpperCase().concat(whoSentLastMessage?.firstname.slice(1,))}`}
                secondary={conversation.messages[conversation.messages.length - 1].content}
            />
        </ListItem>
    );
}

const mapStoreToProps = ({users}: IAppState) => ({
    users: users.list,
    connectedUser: users.connectedUser
})

const mapDispatchToProps = (dispatch: any) => ({
    verifyUnseenMessage: () => { dispatch(makeVerifyUnseenMessages()) }
})

  export default connect(mapStoreToProps, mapDispatchToProps)(ConversationsListItem);