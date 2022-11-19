import Preloader from '../../Common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';


const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader/>
  }

  return (
    <div>
      {/* <div>
        <img src="https://i.ytimg.com/vi/kpf5BqZeES8/maxresdefault.jpg"></img>
      </div> */}
      <div className={classes.descriptionBlock}>
        <img src={props.profile.photos.large}></img>
        <ProfileStatusWithHooks status={props.status} updateUserStatus={props.updateUserStatus}/>
      </div>
    </div>
  );
};

export default ProfileInfo;
