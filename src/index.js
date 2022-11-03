import './index.css';
import reportWebVitals from './reportWebVitals';
// import store from './Redux/State'; изменили store на redux-store
import store from './Redux/redux-store';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
  // let rerenderEntireTree = (state) => {
  root.render(
    // <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    // </React.StrictMode> // убрал чтобы не дублировались пользователи. 
  );
// };

// state={state} dispatch={store.dispatch.bind(store)} store={store}

// После вынесли все в Redux State.js 
// let posts = [
//   {id: 1, message: 'Hi, how are you?', likesCount: 10},
//   {id: 2, message: 'It is my first post', likesCount: 201},
//   {id: 3, message: 'Yo', likesCount: 20}
// ]

// let dialogs = [
//   {id: 1, name: 'Alex'},
//   {id: 2, name: 'Lera'},
//   {id: 3, name: 'Crosby'},
//   {id: 4, name: 'Schoko'},
// ]

// let messages = [
//   {id: 1, message: 'Hi'},
//   {id: 2, message: 'How are you?'},
//   {id: 3, message: 'Yo'},
//   {id: 3, message: 'Yo'}
// ]

// rerenderEntireTree()
// rerenderEntireTree(store.getState())

// store.subscribe(() => {
//   let state = store.getState()
//   rerenderEntireTree(state)
// })


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
