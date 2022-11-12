import Preloader from '../../Common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatus from './ProfileStatus';


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
        <ProfileStatus status={'Hello my friends'}/>
      </div>
    </div>
  );
};

export default ProfileInfo;
