import React from 'react';
import { reduxForm } from 'redux-form';
import { createField, Input, Textarea } from '../../Common/Forms/FormsControls';
import cl from './ProfileInfo.module.css';
import classes from '../../Common/Forms/FormsControls.module.css' // поменял classes на c, может быть ошибка

const ProfileDataForm = ({handleSubmit, profile, error}) => {
  // debugger
  return <form onSubmit={handleSubmit}>
      <div><button>Save</button></div>
      {error && <div className={cl.formSummaryError}>
        {error}
      </div>
      }
      <div>
        <b>Full name</b>: {createField('Full name', 'fullName', [], Input)}
      </div>

      <div>
        <b>Looking for a job</b>: {createField('', 'lookingForAJob', [], Input, { type: 'checkbox' })}
      </div>

      <div>
        <b>My skills</b>: {createField('My skills', 'lookingForAJobDescription', [], Textarea)}
      </div>

      <div>
        <b>About me</b>: {createField('About Me', 'aboutMe', [], Textarea)}
      </div>

      <div>
        <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
        return <div key={key} className={classes.contacts}> 
        <b>{key}: {createField(key, 'contacts.' + key, [], Input)}</b> 
      </div>
      })}
      </div>
    </form>
};

const ProfileDataFormReduxForm = reduxForm({ form: 'edit-profile' })(
  ProfileDataForm
);
export default ProfileDataFormReduxForm;
