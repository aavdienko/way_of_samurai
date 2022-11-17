import classes from './MyPosts.module.css';
import Post from './Post/Post';
import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, maxLengthCreator } from '../../../Utilities/validators';
import { Textarea } from '../../Common/Forms/FormsControls';

const MyPosts = (props) => {
  let postsElements = props.posts.map((post) => (
    <Post message={post.message} likesCount={post.likesCount} />
  ));

  // let newPostElement = React.createRef();

  const onAddPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <AddPostReduxForm onSubmit={onAddPost} />
      <div className={classes.posts}>{postsElements}</div>
    </div>
  );
};

const maxLength10 = maxLengthCreator(10);

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name={'newPostText'}
          component={Textarea}
          validate={[required, maxLength10]}
        ></Field>
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const AddPostReduxForm = reduxForm({
  form: 'addPostForm',
})(AddPostForm);

export default MyPosts;
