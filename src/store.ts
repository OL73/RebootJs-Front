import { applyMiddleware, createStore } from "redux";
import { appReducer } from "./appReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk"; // ? sert à gérer des actions qui sont asynchrones notamment (dispatch: any)... pour les pré-actions avant l'action dans le reducer

const store = createStore(
  appReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;