import { IAppState } from './../../../appReducer';
import { getConversations } from "../../../api/messages"
import { updateConversationsList } from "./updateConversationsList";
import { makeVerifyUnseenMessages } from './makeVerifyUnseenMessages';

export function makeFetchConversationsList() {

    return async (dispatch: any, getState: () => IAppState) => { //getState: () => IAppState permet de récupérer les infos du state global
        try {

            const connectedUser = getState().users.connectedUser;
            if (!connectedUser) { return }

            // 1. connexion vers api/messages pour obtenir les conversations en PRE-ACTION
            const conversations = await getConversations();

            /*
            conversations = [ {_id: '1234567', unseenMessages: 0, messages: [mess1]}, conv2 ]
            const connectedUser = { ..., conversationsSeen: { '123456': 'DATE' } }
            const conversation = {_id: '123456', unseenMessages: 0, messages: [mess1]}
            */

            /* ===> déplacement de la logique dans makeVerifyUnseenMessages()

                conversations.map(conversation => {
                    const lastSeenDate = connectedUser.conversationsSeen[conversation._id]
                    let unseenMessages;
                    if (!lastSeenDate) {
                        unseenMessages = conversation.messages.length; // 0
                    } else {
                        unseenMessages = conversation.messages
                            .filter(message => new Date(message.createdAt) > new Date(lastSeenDate))
                            .length
                    }
                    conversation.unseenMessages = unseenMessages;
                    return conversation
                }) 
            */

            /*
              conversationns = [
                {_id: '1234567', unseenMessages: 2, messages: [mess1]},
                {_id: '123456', unseenMessages: 4, messages: [mess2]}
              ]
              reduce((acc, conv) => acc + conv.unseenMessages, 0)
              const connectedUser = { conversationsSeen: { '123456': 'DATE' } }
              const conversation = {_id: '123456', unseenMessages: 0, messages: [mess1]}
            */

            // 2. puis dispatch dans le state
            await dispatch(updateConversationsList(conversations)) 
            
            // 3. on vérifie les messages non lus avec makeVerifyUnseenMessages()
            // uniquement lorsque la liste des conversations a été mise à jour !
            // d'où le await sur l'appel à la méthode précédente
            dispatch(makeVerifyUnseenMessages());  

        } catch (err) {
            console.log(err);
        }
    }
}