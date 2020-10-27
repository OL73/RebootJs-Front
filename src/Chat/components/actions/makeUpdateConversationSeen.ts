import { patchConversationSeen } from "./../../../api/users";
import { updateConnectedUser } from "./../../../Users/actions/updateConnectedUser";

/*
TODO LIST Notifications

- Back
  - Info a stocker en BD : conversationSeen DONE
  - Route PATCH qui met à jour la date dans la bonne conversation /api/users/conversation-seen + body: {conversationId: 1234}

- Front
  - Utiliser cette route quand on charge les messages d'une conversation
    (tips: componentDidUpdate(oldProps) => Appeler la route quand les messages ont changés)

  - Update l'attribut unseenMessages des conversations en fonction de la date stockée dans conversation-seen
  - update l'attribut "general" qui agrège les unseenMessages (qu'on a appelé totalUnseenMessages)

  - Faire un badge qui affiche le nombre de message non lu dans la navbar (nombre de message non lu est dispo dans le store )

*/

export function makeUpdateConversationSeen(conversationId: string){
  return async (dispatch: any) => {
    try {
      const user = await patchConversationSeen(conversationId); // user = userUpdated = IUser + propriété conversationsSeen { 'convId': new Date }
      dispatch(updateConnectedUser(user)); // on remet à jour le user connecté avec les nouvelles infos de l'objet User
    } catch(err){
      console.error(err);
    }
  }
}