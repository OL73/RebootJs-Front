import { IUsersAction, IUsersState, UPDATED_USERS_LIST, UPDATE_CONNECTED_USER } from "./types";

export function users(state: IUsersState = defaultUsersState(), action: IUsersAction): IUsersState {
  switch(action.type){
    case UPDATE_CONNECTED_USER:
      return {
        ...state,
        connectedUser: action.user
      }
    case UPDATED_USERS_LIST:

        return {
            ...state,
          list : action.users,
        }
    default:
      return state
  }
}

function defaultUsersState(){
  return {
    list: [],
  }
}