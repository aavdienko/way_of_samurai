import Preloader from '../../Common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../Assets/User.png'
import { useState } from 'react';


const ProfileInfo = (props) => {

  let [editMode, setEditMode] = useState(false)


  if (!props.profile) {
    return <Preloader/>
  }

  const onMainPhotoSelected = (event) => {
    if (event.target.files.length) {
      props.savePhoto(event.target.files[0])
    }// если длинна массива файла больше нуля (есть)

  }

  return (
    <div>
      {/* <div>
        <img src="https://i.ytimg.com/vi/kpf5BqZeES8/maxresdefault.jpg"></img>
      </div> */}
      <div className={classes.descriptionBlock}>
        <img src={props.profile.photos.large || userPhoto} className={classes.mainPhoto}></img>
        {props.isOwner && <input type={'file'} onChange={onMainPhotoSelected}/>}

        {editMode
          ? <ProfileDataForm profile={props.profile}/> 
          : <ProfileData profile={props.profile} isOwner={props.isOwner} goToEditMode={ () => setEditMode(true)}/>
        }

        <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
      </div>
    </div>
  );
};

// Компоненеты исапользуемыем в инфо обо мне

const ProfileData = (props, {goToEditMode}) => {
  return  <div>
  {props.isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
  <div>
    <b>Full name</b>: {props.profile.fullName}
  </div>
  <div>
    <b>Looking for a job</b>: {props.profile.lookingForAJob ? 'yes' : 'no'}
  </div>
  { props.profile.lookingForAJob &&
  <div>
    <b>My skills</b>: {props.profile.lookingForAJobDescription}
  </div>
  }

  <div>
    <b>About me</b>: {props.profile.aboutMe}
  </div>
  <div>
    <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
      return <Contact contactTitle={key} contactValue={props.profile.contacts['key']}/>
    })}
  </div>
  <div>
    <b></b>
  </div>
</div>
}

const ProfileDataForm = (props) => {
  return  <div>
    Form
</div>
}

const Contact = ({contactTitle, contactValue}) => {
  return <div className={classes.contacts}><b>{contactTitle}</b>: {contactValue}</div>
}

export default ProfileInfo;
