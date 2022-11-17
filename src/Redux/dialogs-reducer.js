const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
  messages: [
    { id: 1, message: 'Hi' },
    { id: 2, message: 'How are you?' },
    { id: 3, message: 'Yo' },
    { id: 3, message: 'Yo' },
  ],

  dialogs: [
    { id: 1, name: 'Alex' },
    { id: 2, name: 'Lera' },
    { id: 3, name: 'Crosby' },
    { id: 4, name: 'Schoko' },
  ],
};

const dialogsReducer = (state = initialState, action) => {


  switch (action.type) {

    case SEND_MESSAGE:
      let text = action.newMessageText;
      return {
        ...state,
        messages: [...state.messages, { id: 4, message: text }],

      };
      
    default:
      return state;
  }
};

export const sendMessageActionCreator = (newMessageText) => {
  return {
    type: SEND_MESSAGE, newMessageText
  };
};

export default dialogsReducer;
