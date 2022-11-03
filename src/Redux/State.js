import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";



let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 10 },
        { id: 2, message: 'It is my first post', likesCount: 201 },
        { id: 3, message: 'Yo', likesCount: 20 },
      ],
      newPostText: 'it-kamasutra',
    },

    dialogsPage: {
      messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'Yo' },
        { id: 3, message: 'Yo' },
      ],
      newMessageText: '',

      dialogs: [
        { id: 1, name: 'Alex' },
        { id: 2, name: 'Lera' },
        { id: 3, name: 'Crosby' },
        { id: 4, name: 'Schoko' },
      ],
    },

    sidebar: {
      friends: [
        { id: 2, name: 'Lera' },
        { id: 3, name: 'Crosby' },
        { id: 4, name: 'Schoko' },
      ],
    },
  },
  _callSubscriber() {
    console.log('state was changed');
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer; // ovserver - патерн
  },

  // Перенесли вы dispatch в 38 видосе
  // addPost() {
  //   let newPost = {
  //     id: 4,
  //     message: this._state.profilePage.newPostText,
  //     likesCount: 10,
  //   };
  //   this._state.profilePage.posts.push(newPost);
  //   this._state.profilePage.newPostText = '';
  //   this._callSubscriber(this._state);
  // },
  // updateNewPostText(newText) {
  //   this._state.profilePage.newPostText = newText;
  //   this._callSubscriber(this._state);
  // },
  // sendMessage() {
  //   let newMessage = {
  //     id: 4,
  //     message: this._state.dialogsPage.newMessageText,
  //   };
  //   this._state.dialogsPage.messages.push(newMessage);
  //   // state.dialogsPage.newMessageText = '' не зануляется значение
  //   this._callSubscriber(this._state);
  // },
  // updateNewMessgeText(newText) {
  //   this._state.dialogsPage.newMessageText = newText;
  //   this._callSubscriber(this._state);
  // },
  
  dispatch(action) {

    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
    this._state.sidebar = sidebarReducer(this._state.sidebar, action)
  
    this._callSubscriber(this._state);

    // перенесли в свои Reducer
    // if (action.type === ADD_POST) {
    //   let newPost = {
    //     id: 4,
    //     message: this._state.profilePage.newPostText,
    //     likesCount: 10,
    //   };
    //   this._state.profilePage.posts.push(newPost);
    //   this._state.profilePage.newPostText = '';
    //   this._callSubscriber(this._state);
    // } else if (action.type === UPDATE_NEW_POST_TEXT) {
    //   this._state.profilePage.newPostText = action.newText;
    //   this._callSubscriber(this._state);
    // } else if (action.type === SEND_MESSAGE) {
    //   let newMessage = {
    //     id: 4,
    //     message: this._state.dialogsPage.newMessageText,
    //   };
    //   this._state.dialogsPage.newMessageText = ''
    //   this._state.dialogsPage.messages.push(newMessage);
    //   // state.dialogsPage.newMessageText = '' не зануляется значение!!!
    //   this._callSubscriber(this._state);
    // } else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
    //   this._state.dialogsPage.newMessageText = action.newText;
    //   this._callSubscriber(this._state);
    // }
  },
};


// перенесли все ActionCreator в свои Reducer
// export const sendMessageActionCreator = () => {
//   return {
//     type: SEND_MESSAGE
//   }
// }

// export const updateNewMessgeTextActionCreator = (text) => {
//   return {
//     type: UPDATE_NEW_MESSAGE_TEXT,
//     newText: text 
//   }
  // данную функцию не нужно прокидывать через пропсы, так как она лишь является вспомогательной утиллитой, а не частью бизнес логики как например сам addPost
// }


export default store;
window.store = store;
