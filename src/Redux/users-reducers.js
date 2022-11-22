import { usersAPI } from '../API/api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
  users: [],
  pageSize: 100,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        // users: [...state,users],
        users: state.users.map((users) => {
          if (users.id === action.userID) {
            return { ...users, followed: true };
          }
          return users;
        }),
      };

    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map((users) => {
          if (users.id === action.userID) {
            return { ...users, followed: false };
          }
          return users;
        }),
      };

    case SET_USERS: {
      return {
        ...state,
        users: action.users,
      };
    }

    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }

    case SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.count,
      };
    }

    case TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }

    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userID]
          : state.followingInProgress.filter((id) => id != action.userID),
      };
    }
    default:
      return state;
  }
};

export const follow = (userID) => {
  return {
    type: FOLLOW,
    userID,
  };
};

export const unfollow = (userID) => {
  return {
    type: UNFOLLOW,
    userID,
  };
};

export const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

export const setCurrentPage = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage,
  };
};

export const setTotalUsersCount = (totalUsersCount) => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount,
  };
};

export const setToggleIsFetching = (isFetching) => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching,
  };
};

export const setToggleFollowingProgress = (isFetching, userID) => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userID,
  };
};

export const getUsers = (currentPage, pageSize) => {
  return async (dispatch) => {
    dispatch(setToggleIsFetching(true));

    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(setCurrentPage(currentPage));
    dispatch(setToggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

export const followUnfollowThunk = async (dispatch, userID, apiMethod, actionCreator) => {
    dispatch(setToggleFollowingProgress(true, userID));
    let response = await apiMethod(userID);
    if (response.data.resultCode === 0) {
      dispatch(actionCreator(userID));
    }
    dispatch(setToggleFollowingProgress(false, userID));
  };

export const followThunk = (userID) => {
  return async (dispatch) => {
    followUnfollowThunk(dispatch, userID, usersAPI.follow, follow)
  }
}

export const unfollowThunk = (userID) => {
  return async (dispatch) => {
    followUnfollowThunk(dispatch, userID, usersAPI.unfollow, unfollow)
  }
}


// Refactoring 90 Lesson.
// export const followThunk = (userID) => {
//   return async (dispatch) => {
//     dispatch(setToggleFollowingProgress(true, userID));
//     let response = await usersAPI.follow(userID);
//     if (response.data.resultCode === 0) {
//       dispatch(follow(userID));
//     }
//     dispatch(setToggleFollowingProgress(false, userID));
//   };
// };

// export const unfollowThunk = (userID) => {
//   return async (dispatch) => {
//     dispatch(setToggleFollowingProgress(true, userID));
//     let response = await usersAPI.unfollow(userID);
//     if (response.data.resultCode === 0) {
//       dispatch(unfollow(userID));
//     }
//     dispatch(setToggleFollowingProgress(false, userID));
//   };
// };
export default usersReducer;
