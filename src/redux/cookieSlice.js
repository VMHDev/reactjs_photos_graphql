import { createSlice } from '@reduxjs/toolkit';
import { encryptWithAESTripleDES, decryptWithAESTripleDES } from 'utils/hash';
import {
  getValueFromCookies,
  setValueToCookies,
  removeValueFromCookies,
} from 'utils/cookie';
import {
  COOKIES_USERLOGIN_NAME,
  COOKIES_TOKEN_NAME,
  COOKIES_EXPIRE,
} from 'constants/system';

const initCookies = () => {
  // Get info user login from cookie
  const objUserLogin = getValueFromCookies(COOKIES_USERLOGIN_NAME)
    ? JSON.parse(getValueFromCookies(COOKIES_USERLOGIN_NAME))
    : null;

  if (objUserLogin) {
    // Decrypt password from cookie
    const decryptPass = decryptWithAESTripleDES(objUserLogin?.password);
    return {
      userLogin: { ...objUserLogin, password: decryptPass },
      token: getValueFromCookies(COOKIES_TOKEN_NAME)
        ? JSON.parse(getValueFromCookies(COOKIES_TOKEN_NAME))
        : null,
    };
  } else {
    return {
      userLogin: null,
      token: null,
    };
  }
};
const initialState = initCookies();

const user_cookies = createSlice({
  name: 'cookies',
  initialState,
  reducers: {
    addLogin: (state, action) => {
      const user = action.payload.user ? action.payload.user : null;
      const token = action.payload.token ? action.payload.token : null;
      // Update state
      state.userLogin = user;
      state.token = token;

      if (user && token) {
        // Encrypt password
        const objUser = {
          ...user,
          password: encryptWithAESTripleDES(user.password),
        };

        // Update cookie
        setValueToCookies(COOKIES_USERLOGIN_NAME, JSON.stringify(objUser), {
          expires: parseInt(COOKIES_EXPIRE),
        });
        setValueToCookies(COOKIES_TOKEN_NAME, JSON.stringify(token), {
          expires: parseInt(COOKIES_EXPIRE),
        });

        // Remove data in local storage
        localStorage.removeItem('photos');
        localStorage.removeItem('categories');
      }
    },
    updateToken: (state, action) => {
      const token = action.payload.token ? action.payload.token : null;
      // Update state
      state.token = token;
      // Update cookie
      if (token) {
        setValueToCookies(COOKIES_TOKEN_NAME, JSON.stringify(token), {
          expires: parseInt(COOKIES_EXPIRE),
        });
      } else {
        removeValueFromCookies([COOKIES_TOKEN_NAME]);
      }
    },
    removeLogin: (state, action) => {
      state.userLogin = action.payload;
      state.token = action.payload;
      // Update cookie
      removeValueFromCookies([COOKIES_USERLOGIN_NAME, COOKIES_TOKEN_NAME]);
      // Remove data in local storage
      localStorage.removeItem('photos');
      localStorage.removeItem('categories');
    },
  },
});

const { reducer, actions } = user_cookies;
export const { addLogin, updateToken, removeLogin } = actions;
export default reducer;
