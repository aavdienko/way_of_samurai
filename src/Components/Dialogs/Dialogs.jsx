import { Navigate, NavLink } from 'react-router-dom';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './DialogMessage/DialogMessage';
import React from 'react';
import { Field, reduxForm } from 'redux-form';

const Dialogs = (props) => {

  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ));

  let messagesElements = state.messages.map((message) => (
    <Message message={message.message} />
  ));

  let newMessageText = state.newMessageText;


  const addNewMessage = (values) => {
    props.sendMessage(values.newMessageText)
  }

  const MessageForm = (props) => {
    return (
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field
            placeholder={'Enter your message'}
            name={'newMessageText'}
            component={'textarea'}
          ></Field>
        </div>
        <div>
          <button>Send message</button>

        </div>
      </form>
    );
  };

  const MessageReduxForm = reduxForm({
    form: 'dialogMessageForm',
  })(MessageForm);

  if (!props.isAuth) return <Navigate to={'/login'} />;

  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>{dialogsElements}</div>
      <div className={classes.messages}>
        <div>{messagesElements}</div>
      </div>
      <MessageReduxForm onSubmit={addNewMessage} />
    </div>
  );
};

export default Dialogs;
