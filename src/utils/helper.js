import jwt from 'jsonwebtoken';
import momenttimezone from 'moment-timezone';

import store from 'redux/store';
import authApi from 'api/authApi';
import { isExpire } from 'utils/datetime';
import { updateToken } from 'redux/cookieSlice';

/**
 * Appending data to a localStorage() array
 * @param {string} key Key Local Storage
 * @param {string} value Value Local Storage
 */
const addToLocalStorageArray = (key, value) => {
  try {
    // Get the existing data
    let existing = localStorage.getItem(key);

    // If no existing data, create an array
    // Otherwise, convert the localStorage string to an array
    let arr = existing ? JSON.parse(existing) : [];

    // Add new data to localStorage Array
    arr.data.push(value);

    // Save back to localStorage
    localStorage.setItem(key, JSON.stringify(arr));
  } catch (error) {
    console.log('utils/helper/addToLocalStorageArray', error);
  }
};

/**
 * Set delay time
 * @param {number} ms Milisecond delay
 */
const timeout = (ms) => {
  try {
    return new Promise((resolve) => setTimeout(resolve, ms));
  } catch (error) {
    console.log('utils/helper/timeout', error);
  }
};

/**
 * Refresh token when expire
 */
const refreshAccessTokenExpire = async () => {
  try {
    const token = store.getState().cookies?.token;

    if (token?.accessToken) {
      const decoded = jwt.decode(token?.accessToken);
      const timeExp = momenttimezone.unix(decoded.exp);

      if (!isExpire(timeExp)) {
        return true;
      }
      const response = await authApi.refreshToken({
        refreshToken: token?.refreshToken,
      });

      //Update state
      if (response?.data.success) {
        store.dispatch(updateToken({ token: response?.data.token }));
        return true;
      }
    }
  } catch (error) {
    console.log('utils/helper/refreshAccessTokenExpire', error);
  }
  return false;
};

export { addToLocalStorageArray, timeout, refreshAccessTokenExpire };
