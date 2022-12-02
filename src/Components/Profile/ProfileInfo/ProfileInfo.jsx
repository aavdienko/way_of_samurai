import React, { useState } from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../Common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../Assets/User.png'
import ProfileDataForm from './ProfileDataForm';


const ProfileInfo = ({profile, status, updateUserStatus, isOwner, savePhoto, saveProfile}) => {

  let [editMode, setEditMode] = useState(false)


  if (!profile) {
    return <Preloader/>
  }

  const onMainPhotoSelected = (event) => {
    if (event.target.files.length) {
      savePhoto(event.target.files[0])
    }// если длинна массива файла больше нуля (есть)
  }

  const onSubmit = (formData) => {
    saveProfile(formData).then(
      () => {
        setEditMode(false)
      }
    )
  };

  return (
    <div>
      <div className={classes.descriptionBlock}>
        <img src={profile.photos.large || userPhoto} className={classes.mainPhoto}></img>
        {isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}

        {editMode
          ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/> 
          : <ProfileData goToEditMode={() => {setEditMode(true)} } profile={profile} isOwner={isOwner}/>
        }

        <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
      </div>
    </div>
  );
};

// Компоненеты исапользуемыем в инфо обо мне

const ProfileData = ({profile, isOwner, goToEditMode}) => {
  return  <div>
  {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
  <div>
    <b>Full name</b>: {profile.fullName}
  </div>
  <div>
    <b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}
  </div>
  {profile.lookingForAJob &&
  <div>
    <b>My skills</b>: {profile.lookingForAJobDescription}
  </div>
  }

  <div>
    <b>About me</b>: {profile.aboutMe}
  </div>
  <div>
    <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
      return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
    })}
  </div>
</div>
}

export const Contact = ({contactTitle, contactValue}) => {
  return <div className={classes.contacts}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;
