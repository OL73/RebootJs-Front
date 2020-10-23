import { IUser, UPDATED_USERS_LIST, IUpdatedUsersAction} from './../types';

export function updatedUsersList(users: IUser[]): IUpdatedUsersAction {
    return {
        type: UPDATED_USERS_LIST,
        users: users
    }
}