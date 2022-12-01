import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { formValueSelector } from 'redux-form';
import classes from './ProfileInfo.module.css';

const ProfileStatusWithHooks = (props) => {

  // let stateWithSetState = useState(true); // возвращает нам массив из 2 элементов
  // let editMode = stateWithSetState[0]; // первый эллемент
  // let setEditMode = stateWithSetState[1]; // функция которая будет изменять значение editMode

  //запись с помощью диструктуризации массивов

  let [editMode, setEditMode] = useState(false)
  let [status, setStatus] = useState(props.status)

  useEffect( () => {

    setStatus(props.status)
  }, [props.status])

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false)
    props.updateUserStatus(status)
  }

  const onStatusChange = (event) => {
    setStatus(event.currentTarget.value)
  }

  return (
    <div>
      {!editMode && (
        <div>
          <b>Status</b> : <span onDoubleClick={activateEditMode}>{props.status || 'No Status'}</span>
        </div>
      )}

      {editMode && (
        <div>
          <input
            onChange={onStatusChange}
            autoFocus={true}
            onBlur={deactivateEditMode}
            value={status}
          />
        </div>
      )}
    </div>
  );
};

// state = {
//   editMode: false,
//   status: this.props.status,
// };

// activateEditMode = () => {
//   this.setState({
//     editMode: true
//   })
// }

// deactivateEditMode = () => {
//   this.setState({
//     editMode: false
//   })
//   this.props.updateUserStatus(this.state.status)
// }

// onStatusChange = (event) => {
//   this.setState({
//     status: event.currentTarget.value
//   })
// }

// componentDidUpdate(prevProps, prevState) {
//   if (prevProps.status !== this.props.status) {
//     this.setState({
//       status: this.props.status
//     })
//   }
//   console.log('componentDidUpdate')
// }

export default ProfileStatusWithHooks;
