import { trackPromise } from 'react-promise-tracker';

import userApi from 'api/userApi';
import { timeout, refreshAccessTokenExpire } from 'utils/helper';

import { IS_REFRESH_TOKEN_FAIL } from 'constants/other';

export const useUsesGetExceptUserId = () => {
  const callback = async (data) => {
    try {
      // Call api
      const response = await trackPromise(userApi.getExceptUserId(data));
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

export const useGetById = () => {
  const callback = async (params) => {
    try {
      const response = await trackPromise(userApi.getById(params));
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

export const useGetByEmail = () => {
  const callback = async (params) => {
    try {
      const response = await trackPromise(
        userApi.getByEmail({ email: params })
      );
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

export const useRegister = () => {
  const callback = async (params) => {
    try {
      const response = await trackPromise(userApi.register(params));
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

export const useUserUpdate = () => {
  const callback = async (params) => {
    try {
      // Refresh token when expire
      if (!(await trackPromise(refreshAccessTokenExpire()))) {
        return { success: false, message: IS_REFRESH_TOKEN_FAIL };
      }
      // Call API
      const response = await trackPromise(userApi.update(params));
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

export const useUserSetPermission = () => {
  const callback = async (data) => {
    try {
      // Refresh token when expire
      if (!(await trackPromise(refreshAccessTokenExpire()))) {
        return { success: false, message: IS_REFRESH_TOKEN_FAIL };
      }
      // Call API
      const response = await trackPromise(userApi.setPermission(data));
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
