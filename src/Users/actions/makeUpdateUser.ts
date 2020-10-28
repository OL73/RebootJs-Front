import { IAppState } from "../../appReducer";
import { IUser } from "../types";
import { updatedUsersList } from "./updatedUsersList";

export function makeUpdateUser(userToUpdate: IUser){
  return (dispatch: any, getState: () => IAppState) => {
    const users = getState().users.list;

    const updatedList = [ // pourquoi on retourne la liste des users non connectés ???
      ...users.filter(user => user._id !== userToUpdate._id),
      userToUpdate
    ]

    dispatch(updatedUsersList(updatedList));
  }
}