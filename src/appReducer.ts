import { combineReducers } from "redux";
import { users } from './Users/reducer';
import { conversations } from './Chat/reducer';

export const appReducer = combineReducers({
  users,
  conversations
});

export type IAppState = ReturnType<typeof appReducer>

/* RECUPERER LE USER CONNECTE
- fetch vers l'api DONE :)
- creer un reducer pour users DONE :)
- essayer de passer par les valeurs par défaut pour remplir le state avec la liste des users, le user connecté


- Actions:
  Charger les users et les mettres dans le store
  Charger le user connecté et qui le met dans le store

  
- ...


*/


/* RECUPERER LA LISTE DES USERS
- Créer une fonction qui appelle les users de façon synchrone ("pre-action")
- Créer une fonction qui récupère la liste des users ("action")
- reducers reçoit les infos des users fetché (résultat de la préaction "cas dans le reducer")

- Composants
  - AppLayout => Dispatch la préaction pour fetch les users
  - UsersList => Connecter au store pour accéder à la liste

- Beaucoup de nouveaux types
*/