import { authAPI, securityAPI } from '../API/api';
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTURE_URL_SUCCESS = 'GET_CAPTURE_URL_SUCCESS'

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // если действие одинаково, можем просто дописать case без return 
    case SET_USER_DATA:
    case GET_CAPTURE_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export const setAuthUserData = (id, email, login, isAuth, captchaUrl) => {
  return {
    type: SET_USER_DATA,
    payload: { id, email, login, isAuth, captchaUrl },
  };
};

export const getCaptchaUrlSuccess = (captchaUrl) => {
  return {
    type: GET_CAPTURE_URL_SUCCESS,
    payload: {captchaUrl}
  };
};

// export const getAuthUserData = () => (dispatch) => {
//   return authAPI.me()
//     .then((response) => {
//       if (response.data.resultCode === 0) {
//         let { id, email, login } = response.data.data;
//         dispatch(setAuthUserData(id, email, login, true));
//       }
//     });

// export const login = (email, password, rememberMe) => (dispatch) => {
//   authAPI.login(email, password, rememberMe).then((response) => {
//     if (response.data.resultCode === 0) {
//       dispatch(getAuthUserData());
//     } else {
//       let message =
//         response.data.messages.length > 0
//           ? response.data.messages[0]
//           : 'Email or Password is incorrect';
//       dispatch(stopSubmit('login', { _error: message }));
//     }
//   });
// };

// export const logout = () => (dispatch) => {
//   authAPI.logout().then((response) => {
//     if (response.data.resultCode === 0) {
//       dispatch(setAuthUserData(null, null, null, false));
//     }
//   });
// };

// }; переписали на async await

export const getAuthUserData = () => async (dispatch) => {

  try {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
      let { id, email, login } = response.data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  } 
  catch (error) {
    console.log( error.response.status );
    console.log( error );
  }
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
  let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
        if (response.data.resultCode === 10) {
          dispatch(getCaptchaUrl())
        }
        let message =
          response.data.messages.length > 0
            ? response.data.messages[0]
            : 'Email or Password is incorrect';
        dispatch(stopSubmit('login', { _error: message }));
      }
  }

  export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl));
  }

export const logout = () => async (dispatch) => {
  let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false, null));
    }
}

export default authReducer;
