import { IAppState } from "../../appReducer"
import { makeFetchConversationsList } from "../../Chat/components/actions/makeFetchConversations"
import { updatePollingTimer } from "../../Chat/components/actions/updatePollingTimer"
import { makeFetchConnectedUser } from "../../Users/actions/makeFetchConnectedUser"
import { makeFetchUsersList } from "../../Users/actions/makeFetchUsersList"
import { makeStartSocket } from "./makeStartSocket"


export function makeInitApp() {
  return (dispatch: any, getState: () => IAppState) => {

    dispatch(makeFetchConnectedUser());

    dispatch(makeFetchUsersList());
    dispatch(makeFetchConversationsList());
    dispatch(makeStartSocket());

    const timer = setInterval(() => {
      if (getState().users.connectedUser) {
        dispatch(makeFetchConversationsList());
      }
    }, 3000)
    dispatch(updatePollingTimer(timer));
  }
} 