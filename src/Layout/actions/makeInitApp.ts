import { IAppState } from "../../appReducer"
import { makeFetchConversationsList } from "../../Chat/components/actions/makeFetchConversations"
import { updatePollingTimer } from "../../Chat/components/actions/updatePollingTimer"
import { makeFetchConnectedUser } from "../../Users/actions/makeFetchConnectedUser"
import { makeFetchUsersList } from "../../Users/actions/makeFetchUsersList"


export function makeInitApp(){
    return (dispatch: any, getState: () => IAppState) => {
      dispatch(makeFetchConnectedUser())
      dispatch(makeFetchUsersList())
      dispatch(makeFetchConversationsList())
  
      const timer = setInterval(() => {
        if(getState().users.connectedUser) {
          dispatch(makeFetchConversationsList())
        }
      }, 3000)
      dispatch(updatePollingTimer(timer));
    }
  } 