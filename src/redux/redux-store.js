import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMW from "redux-thunk";
import {reducer as formReducer} from "redux-form";

import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";


let reducers = combineReducers({
    // Keys are auto created attrs of store._state
    app: appReducer,
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,   // Preferable way - 'form' must be defined as key for redux-form
});

let store = createStore(reducers, applyMiddleware(thunkMW));


export default store;
