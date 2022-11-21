import { usersAPI } from "../API/api";
import { profileAPI } from "../API/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_STATUS = 'SET-USER-STATUS';

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

export const getUserProfile = (userId) => (dispatch) => {
  usersAPI.getProfile(userId)
  .then((response) => {
    dispatch(setUserProfile(response.data))
  });
}

export const getUserStatus = (userId) => (dispatch) => {
  profileAPI.getStatus(userId)
  .then((response) => {
    dispatch(setUserStatus(response.data))
  });
}

export const updateUserStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status)
  .then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setUserStatus(status))
    }
  });
}

export default profileReducer;
