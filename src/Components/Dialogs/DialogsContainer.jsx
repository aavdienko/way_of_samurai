import { NavLink } from 'react-router-dom';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './DialogMessage/DialogMessage';
import React from 'react';
import {
  sendMessageActionCreator,
  updateNewMessgeTextActionCreator,
} from '../../Redux/dialogs-reducer';
import Dialogs from './Dialogs';
import store from '../../Redux/State';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../HOC/withAuthRedirect';

// const DialogsContainer = () => {
//   // let dialogsElements = props.state.dialogs.map((dialog) => (
//   //   <DialogItem name={dialog.name} id={dialog.id} />
//   // ));

//   // let messagesElements = props.state.messages.map((message) => (
//   //   <Message
//   //     message={message.message}
//   //     id={message.id}
//   //     newMessageText={props.state.newMessageText}
//   //     dispatch={props.dispatch}
//   //     // updateNewMessgeText={props.updateNewMessgeText}
//   //     // sendMessage={props.sendMessage}
//   //   />
//   // ));

//   // let newMessageElement = React.createRef();

//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         let state = store.getState().dialogsPage;

//         let onSendMessageClick = () => {
//           store.dispatch(sendMessageActionCreator());
//         };

//         let onMessageChange = (text) => {
//           store.dispatch(updateNewMessgeTextActionCreator(text));
//         };

//         return (
//           <Dialogs
//             updateNewMessgeText={onMessageChange}
//             sendMessage={onSendMessageClick}
//             dialogsPage={state}
//           />
//         );
//       }}
//     </StoreContext.Consumer>
//   );
// };

let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
    // isAuth: state.auth.isAuth
  };
};

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: () => {
      dispatch(sendMessageActionCreator());
    },
    updateNewMessgeText: (text) => {
      dispatch(updateNewMessgeTextActionCreator(text));
    },
  };
};

let AuthRedirectComponent = withAuthRedirect(Dialogs)

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;
