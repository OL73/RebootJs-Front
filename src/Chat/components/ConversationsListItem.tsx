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

    // 1ère logique afficher les noms prénoms des users qui ont envoyé le derier message
    /* const emitter = conversation.messages[conversation.messages.length - 1].emitter;

    let whoSentLastMessage: IUser | undefined;

    if (users && connectedUser) {
        whoSentLastMessage = users.find(user => user._id === emitter);
    } */

    // 2nd logique, afficher les noms et prénoms de tous users avec lesquels l'utilisateur connecté à échanger un ou plusieurs messages
    // récupération de toutes les targets d'une conversation SANS l'utilisteur connecté
    const targetsNonDistincts = conversation.messages.map(messages => messages.targets.filter(elt => elt !== connectedUser?._id)).flat();

    // récupération uniquement des targets identiques (like distinct)
    const targets = [...new Set(targetsNonDistincts)];

    let recipients: IUser[] = [];

    if (users) {
        
        for (let i = 0; i < users.length; i++) {
            for (let j = 0; j < targets.length; j++) {
                if (targets[j] === users[i]._id) {
                    recipients?.push(users[i]);
                }
            }
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
                /*  1ère logique 
                primary={ 
                    `${whoSentLastMessage?.firstname[0].toUpperCase().concat(whoSentLastMessage?.firstname.slice(1,))} 
                    ${whoSentLastMessage?.lastname[0].toUpperCase().concat(whoSentLastMessage?.lastname.slice(1,))}`
                } */
                
                /* 2nde logique */
                primary={ recipients.map(recipient => 
                    `${recipient.firstname[0].toUpperCase().concat(recipient.firstname.slice(1,))}
                    ${recipient.lastname[0].toUpperCase().concat(recipient.lastname.slice(1,))}`
                )}

                secondary={conversation.messages[conversation.messages.length - 1].content}
            />
        </ListItem>
    );
}

const mapStoreToProps = ({ users }: IAppState) => ({
    users: users.list,
    connectedUser: users.connectedUser
})

const mapDispatchToProps = (dispatch: any) => ({
    verifyUnseenMessage: () => { dispatch(makeVerifyUnseenMessages()) }
})

export default connect(mapStoreToProps, mapDispatchToProps)(ConversationsListItem);