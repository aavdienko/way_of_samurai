import { NavLink } from 'react-router-dom';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './DialogMessage/DialogMessage';
import React from 'react';


const Dialogs = (props) => {

  let state = props.dialogsPage

  // Пернесли в index.js и прокинули через props
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

  let dialogsElements = state.dialogs.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ));

  let messagesElements = state.messages.map((message) => (
    <Message
      message={message.message}
      // id={message.id}
      // newMessageText={state.newMessageText} 
      // dispatch={props.dispatch}
      // updateNewMessgeText={props.updateNewMessgeText}
      // sendMessage={props.sendMessage}
    />
  ));

  let newMessageText = state.newMessageText;

  let onSendMessageClick = () => {
    props.sendMessage()
  };

  let onMessageChange = (event) => {
    let text = event.target.value
    props.updateNewMessgeText(text)

  };
  console.log('newMessage',props.newMessageText);
  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogsItems}>
        {dialogsElements}
        {/* <DialogItem name={dialogsData[0].name} id={dialogsData[0].id}/>
        <DialogItem name={dialogsData[1].name} id={dialogsData[1].id}/>
        <DialogItem name={dialogsData[2].name} id={dialogsData[2].id}/>
        <DialogItem name={dialogsData[3].name} id={dialogsData[3].id}/> */}
      </div>
      <div className={classes.messages}>
        <div>{messagesElements}</div>
        <div>
          <textarea
            placeholder='Enter your message'
            onChange={onMessageChange}
            // ref={newMessageElement}
            value={props.newMessageText}
          ></textarea>
        </div>
        <div>
          <button onClick={onSendMessageClick}>Send message</button>
        </div>
        {/* <Message message={messagesData[0].message} id={messagesData[0].id}/>
        <Message message={messagesData[1].message} id={messagesData[1].id}/>
        <Message message={messagesData[2].message} id={messagesData[2].id}/> */}
      </div>
    </div>
  );
};

export default Dialogs;
