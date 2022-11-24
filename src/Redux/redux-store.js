import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import authReducer from "./auth-reducers";
import dialogsReducer from "./dialogs-reducer";
import {profileReducer} from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducers";
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer
})

 // это что бы работал Redux DevTools
//  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//  const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

//  window.__store__ = store

 let store = createStore( reducers, applyMiddleware( thunkMiddleware ) );

 window.store55 = store;
 
export default store