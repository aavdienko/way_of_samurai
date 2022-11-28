import Preloader from '../../Common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../Assets/User.png'


const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader/>
  }

  const onMainPhotoSelected = (event) => {
    if (event.taget.files.length) {
      props.savePhoto(event.taget.files[0])
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
        <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
      </div>
    </div>
  );
};

export default ProfileInfo;
