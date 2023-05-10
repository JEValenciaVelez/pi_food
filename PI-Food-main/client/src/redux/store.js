
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducer/index";
import thunk from "redux-thunk";
//Importamos todo lo necesario para crear el Store.

const store = createStore(rootReducer,(applyMiddleware(thunk)));
//Exportamos el store
export default store;