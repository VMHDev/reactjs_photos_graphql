import { useDispatch } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';

import { addLogin, removeLogin } from 'redux/cookieSlice';
import authApi from 'api/authApi';
import { timeout } from 'utils/helper';

export const useLogin = () => {
  const dispatch = useDispatch();

  const callback = async (params) => {
    try {
      // Call api
      const response = await trackPromise(authApi.login(params));

      // Update state
      if (response?.data.success) {
        const userRes = response?.data.user ? response?.data.user : null;
        const tokenRes = response?.data.accessToken
          ? response?.data.accessToken
          : null;

        if (userRes && tokenRes) {
          const { refresh_token, ...user } = userRes;
          const token = {
            accessToken: tokenRes,
            refreshToken: refresh_token,
          };
          dispatch(addLogin({ user, token }));
        } else {
          return {
            success: false,
            message: 'Process failed! Please check again!',
          };
        }
      }
      // Response
      await trackPromise(timeout(1000));
      return response?.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' };
    }
  };
  return [callback];
};

export const useLogout = () => {
  const dispatch = useDispatch();

  const callback = async (params) => {
    try {
      // Call api
      const response = await trackPromise(
        authApi.logout({ userId: params.userId })
      );
      // Update state
      if (response?.data.success) {
        dispatch(removeLogin(null));
      }
      // Response
      await trackPromise(timeout(1000));
      return response?.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' };
    }
  };
  return [callback];
};

export const useChangePassword = () => {
  const callback = async (params) => {
    try {
      const response = await trackPromise(authApi.changePassword(params));
      await trackPromise(timeout(1000));
      return response?.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' };
    }
  };
  return [callback];
};

export const useGetTokenPassword = () => {
  const callback = async (params) => {
    try {
      const response = await trackPromise(authApi.getTokenPassword(params));
      await trackPromise(timeout(1000));
      return response?.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' };
    }
  };
  return [callback];
};

export const useAddTokenPassword = () => {
  const callback = async (params) => {
    try {
      const response = await trackPromise(authApi.addTokenPassword(params));
      await trackPromise(timeout(1000));
      return response?.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: 'Server error' };
    }
  };
  return [callback];
};
