import { Badge, ListItem, ListItemText } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IAppState } from '../../appReducer';
import { IUser } from '../../Users/types';
import { IConversation } from '../types';
import { makeUpdateConversationSeen } from './actions/makeUpdateConversationSeen';
import { makeVerifyUnseenMessages } from './actions/makeVerifyUnseenMessages';

export interface ConversationsListItemProps {
    conversation: IConversation;
    verifyUnseenMessage: () => void;
    users: IUser[];
    connectedUser?: IUser;
    updateConversationSeen: (convId: string) => void;
}

const ConversationsListItem: React.FunctionComponent<ConversationsListItemProps> = ({ conversation, verifyUnseenMessage, users, connectedUser, updateConversationSeen }) => {

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

    useEffect( // équivalent à componentDidMount() + componentDidUpdate()
        () => {
            verifyUnseenMessage()
            //updateConversationSeen(conversation._id)
        },
        [conversation, verifyUnseenMessage, users, connectedUser]
    )

    // permet d'éviter l'affichage d'un nouveau message quand le message est envoyé par l'emitter, s'affiche uniquement si je suis la targets
    function showUnseenConversationsCounterWithoutEmitter() {
        
        // logique de l'app, les messages s'ajoutent les uns après les autres dans conversation.messages
        // du coup on récupère le dernier emitter et on le compare à l'utilisateur connecté
        const lastEmitter = conversation.messages[conversation.messages.length - 1].emitter;

        if (lastEmitter === connectedUser?._id) {
            return conversation.unseenMessages - 1;
        } else {
            return conversation.unseenMessages;
        }
    }

    return (
        <ListItem
            divider
            button
            onClick={() => updateConversationSeen(conversation._id)} // TODO changer la logique vers ChatMessages
            component={Link}
            to={`/conversation/${conversation._id}`}
            key={conversation._id}>
            <ListItemText
                /*  1ère logique 
                primary={ 
                    `${whoSentLastMessage?.firstname[0].toUpperCase().concat(whoSentLastMessage?.firstname.slice(1,))} 
                    ${whoSentLastMessage?.lastname[0].toUpperCase().concat(whoSentLastMessage?.lastname.slice(1,))}`
                } */

                /* 2nde logique */
                primary={recipients.map((recipient, index) =>
                    `${recipient.firstname[0].toUpperCase().concat(recipient.firstname.slice(1,))}
                    ${recipient.lastname[0].toUpperCase().concat(recipient.lastname.slice(1,))} ${recipients.length > 1 && index !== recipients.length - 1 ? ' - ' : ''}
                    `
                )}
                secondary={conversation.messages.length > 0 ? conversation.messages[conversation.messages.length - 1].content : ''}
            />
            {showUnseenConversationsCounterWithoutEmitter() > 0 ? <Badge badgeContent={conversation.unseenMessages} color="secondary"></Badge> : ''}
        </ListItem>
    );
}

const mapStoreToProps = ({ users }: IAppState) => ({
    users: users.list,
    connectedUser: users.connectedUser
})

const mapDispatchToProps = (dispatch: any) => ({
    verifyUnseenMessage: () => { dispatch(makeVerifyUnseenMessages()); },
    updateConversationSeen: (convId: string) => { dispatch(makeUpdateConversationSeen(convId)) }
})

export default connect(mapStoreToProps, mapDispatchToProps)(ConversationsListItem);