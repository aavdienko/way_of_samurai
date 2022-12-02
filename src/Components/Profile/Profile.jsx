import MyPostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {
  
  // let posts = [
  //   {id: 1, message: 'Hi, how are you?', likesCount: 10},
  //   {id: 2, message: 'It is my first post', likesCount: 201},
  //   {id: 3, message: 'Yo', likesCount: 20}
  // ]

  return (
    <div>
      <ProfileInfo 
        isOwner={props.isOwner} 
        profile={props.profile} 
        status={props.status} 
        updateUserStatus={props.updateUserStatus} 
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}/>

      <MyPostsContainer />
    </div>
  );
};

export default Profile;
