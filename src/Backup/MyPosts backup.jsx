import classes from './MyPosts.module.css';
import Post from './Post/Post';
import React from "react"
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../Redux/profile-reducer';


const MyPosts = (props) => {

  // Пернесли в index.js и прокинули через props
  // let posts = [
  //   {id: 1, message: 'Hi, how are you?', likesCount: 10},
  //   {id: 2, message: 'It is my first post', likesCount: 201},
  //   {id: 3, message: 'Yo', likesCount: 20}
  // ]

  let postsElements = 
    props.posts.map( post => <Post message={post.message} likesCount={post.likesCount}/> )

  let newPostElement = React.createRef()
  
  let onAddPost = () => {
    // let text = newPostElement.current.value; мы перестали послыать текст так как он и так попадает в стейт
    // props.addPost()
    props.dispatch(addPostActionCreator())
  }

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text)
    // props.dispatch({ type: 'UPDATE-NEW-POST-TEXT', newText: text }) перенесли создание action в action creator 
    props.dispatch(updateNewPostTextActionCreator(text)) // вынесли в MyPostsContainer чтобы отчистить компоненту от store / dispatch 
  }

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <div>
        <div>
          <textarea onChange={onPostChange} ref={ newPostElement } value={props.newPostText}/>
        </div>
        <div>
          <button onClick={ onAddPost }>Add post</button>
        </div>
      </div>
      <div className={classes.posts}>
        { postsElements }
        {/* <Post message={postData[0].message} likesCount={postData[0].likesCount}/>
        <Post message={postData[1].message} likesCount={postData[1].likesCount}/> */}
      </div>
    </div>
  );
};

export default MyPosts;
