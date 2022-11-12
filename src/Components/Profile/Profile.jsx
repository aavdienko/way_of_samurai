import store from '../../Redux/State';
import MyPosts from './MyPosts/MyPosts';
import MyPostsContainer from './MyPosts/MyPostsContainer';
// import MyPostsContainer from './MyPosts/MyPostsContainer';
import classes from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { Navigate } from 'react-router-dom';

const Profile = (props) => {
  
  // let posts = [
  //   {id: 1, message: 'Hi, how are you?', likesCount: 10},
  //   {id: 2, message: 'It is my first post', likesCount: 201},
  //   {id: 3, message: 'Yo', likesCount: 20}
  // ]
  if (!props.isAuth) return <Navigate to={'/login'}/>
  return (
    <div>
      <ProfileInfo profile={props.profile}/>
      <MyPostsContainer />
      {/* store={props.store} */}
      {/* <MyPosts
        // store={props.store} 
        posts={props.profilePage.posts} 
        newPostText={props.profilePage.newPostText} 
        dispatch={props.dispatch}
        /> */}
    </div>
  );
};

export default Profile;
