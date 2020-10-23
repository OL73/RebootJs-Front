import { IUpdateConnectedUserAction, IUser, UPDATE_CONNECTED_USER } from "../types";

export function updateConnectedUser(connectedUser: IUser) : IUpdateConnectedUserAction{
  return {
    type: UPDATE_CONNECTED_USER,
    user: connectedUser
  }
}