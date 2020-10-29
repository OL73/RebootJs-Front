import { IAppState } from "../../appReducer"
import { makeFetchConversationsList } from "../../Chat/components/actions/makeFetchConversations"
import { makeFetchConnectedUser } from "../../Users/actions/makeFetchConnectedUser"
import { makeFetchUsersList } from "../../Users/actions/makeFetchUsersList"
import { makeStartSocket } from "./makeStartSocket"


export function makeInitApp() {
  return async (dispatch: any, getState: () => IAppState) => {

    // on a besoin d'attendre la possibilité de la connexion d'un user avant d'exécuter la suite, ce qui explique le await pour la synchronicité
    await dispatch(makeFetchConnectedUser()); 

    dispatch(makeFetchUsersList());
    dispatch(makeFetchConversationsList());
    dispatch(makeStartSocket());

    /* const timer = setInterval(() => { ===> supprimé, utlisation du socket IO dans messagesRoutes côté back
      if (getState().users.connectedUser) {
        dispatch(makeFetchConversationsList());
      }
    }, 3000)
    dispatch(updatePollingTimer(timer)); */
  }
} 