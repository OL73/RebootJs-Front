import { getConnectedUser } from "../../api/users";
import { updateConnectedUser } from "./updateConnectedUser";

// fonction appelée avant l'appel de UpdateConnectedUser
// dans la mesure où le reducer ne peut pas être asynchrone
export function makeFetchConnectedUser() {
  return async (dispatch: any) => {
    try {
      const connectedUser = await getConnectedUser();
      dispatch(updateConnectedUser(connectedUser))
    } catch (err) {
      console.error(err);
    }
  }
}