import { useDispatch } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';

import { addLogin, removeLogin } from 'redux/cookieSlice';
import authApi from 'api/authApi';
import { timeout } from 'utils/helper';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/auth/mutations';

export const useLogin = () => {
  const dispatch = useDispatch();
  const [login, loginMutationResult] = useMutation(LOGIN);

  const callback = async (params) => {
    try {
      // Call api
      const { data } = await trackPromise(
        login({
          variables: {
            input: {
              email: params.email,
              password: params.password,
            },
          },
        })
      );
      const { loading, error } = loginMutationResult;
      console.log('data', data);
      const response = { ...data?.login };
      console.log('response', response);
      console.log('loading', loading);
      console.log('error', error);

      // Update state
      if (response?.success) {
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
      return response;
    } catch (error) {
      return { success: false, message: 'Server error' };
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
