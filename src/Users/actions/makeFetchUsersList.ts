import { getUsers } from './../../api/users';
import { updatedUsersList } from './updatedUsersList';


export function makeFetchUsersList() {

    return async (dispatch: any) => {
        try{
          const usersList = await getUsers();
          dispatch(updatedUsersList(usersList))
        } catch (err) {
          console.error(err);
        }
      }
}