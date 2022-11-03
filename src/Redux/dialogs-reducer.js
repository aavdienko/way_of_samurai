const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
  let stateCopy;

  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      stateCopy = {
        ...state,
        newMessageText: action.newText,
      };
      return stateCopy;

    case SEND_MESSAGE:
      // let newMessage = {
      //   id: 4,
      //   message: state.newMessageText,
      // };
      let text = state.newMessageText;
      stateCopy = {
        ...state,
        newMessageText: '',
        messages: [...state.messages, { id: 4, message: text }],
      };
      return stateCopy;

    default:
      return state;
  }
};

export const sendMessageActionCreator = () => {
  return {
    type: SEND_MESSAGE,
  };
};

export const updateNewMessgeTextActionCreator = (text) => {
  return {
    type: UPDATE_NEW_MESSAGE_TEXT,
    newText: text,
  };
};

export default dialogsReducer;
