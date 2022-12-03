import { usersAPI, profileAPI } from "../API/api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_STATUS = 'SET-USER-STATUS';
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 10 },
    { id: 2, message: 'It is my first post', likesCount: 201 },
    { id: 3, message: 'Yo', likesCount: 20 },
  ],
  profile: null,
  status: '',
}

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 4,
        message: action.newPostText,
        likesCount: 10,
      };
      return {
        ...state,
        posts:[...state.posts, newPost],
        newPostText:'',
      }
    }

    case SET_USER_PROFILE: {
      return {...state, profile: action.profile}
    }

    case SET_USER_STATUS: {
      return {...state, status: action.status}
    }

    case DELETE_POST:
      return {...state, posts: state.posts.filter(p => p.id != action.postId)}

    case SAVE_PHOTO_SUCCESS: {
      return {...state, profile: {...state.profile, photos: action.photos}}
    }

    default:
      return state
  }
};

export const addPostActionCreator = (newPostText) => {
  return {
    type: ADD_POST, newPostText
  }
  // данную функцию не нужно прокидывать через пропсы, так как она лишь является вспомогательной утиллитой, а не частью бизнес логики как например сам addPost
}

export const setUserProfile = (profile) => {
  return {
    type: SET_USER_PROFILE, profile
  }
}

export const setUserStatus = (status) => {
  return {
    type: SET_USER_STATUS, status
  }
}

export const deletePost = (postId) => {
  return {type: DELETE_POST, postId}
}

export const savePhotoSuccess = (photos) => {
  return {
    type: SAVE_PHOTO_SUCCESS, photos
  }
}

export const getUserProfile = (userId) => async (dispatch) => {
  const response = await usersAPI.getProfile(userId)
    dispatch(setUserProfile(response.data))
  }

export const getUserStatus = (userId) => async (dispatch) => {
  const response = await profileAPI.getStatus(userId)
    dispatch(setUserStatus(response.data))
  }

export const updateUserStatus = (status) => async (dispatch) => {

  try {
    const response = await profileAPI.updateStatus(status)
      if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
      }
  }
  catch(error) {
    // debugger
    console.log(error)
  }
}

  export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
      if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
      }
    }

    export const saveProfile = (profile) => async (dispatch, getState) => {
      const userId = getState().auth.id;
      const response = await profileAPI.saveProfile(profile);
      if (response.data.resultCode === 0) {
          debugger
          dispatch(getUserProfile(userId));
      } else {
          dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0] }));
          return Promise.reject(response.data.messages[0]);
      }
  }

export default profileReducer;
