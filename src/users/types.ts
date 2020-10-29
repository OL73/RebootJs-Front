export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  status: 'online' | 'offline';
  conversationsSeen: {[convId: string]: Date};
}

export interface IUsersState {
  list: IUser[];
  connectedUser?: IUser;
}

export const UPDATE_CONNECTED_USER = 'UPDATE_CONNECTED_USER';
export const UPDATED_USERS_LIST = 'UPDATED_USERS_LIST';

export interface IUpdateConnectedUserAction {
  type: typeof UPDATE_CONNECTED_USER,
  user: IUser
}

export interface IUpdatedUsersAction {
  type: typeof UPDATED_USERS_LIST,
  users: IUser[] 
}

export type IUsersAction = IUpdateConnectedUserAction | IUpdatedUsersAction;