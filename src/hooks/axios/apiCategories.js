import { useDispatch } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';

import {
  setCategory,
  addCategory,
  updateCategory,
  removeCategory,
} from 'redux/categorySlice';
import categoryApi from 'api/categoryApi';
import { timeout, refreshAccessTokenExpire } from 'utils/helper';

import { IS_REFRESH_TOKEN_FAIL } from 'constants/other';

export const useCategoryGetAll = () => {
  const dispatch = useDispatch();

  const callback = async () => {
    try {
      // Call api
      const response = await trackPromise(categoryApi.getAll());
      // Update state
      if (response?.data.success) {
        const data = response?.data.categories ? response?.data.categories : [];
        dispatch(setCategory(data));
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

export const useCategoryAdd = () => {
  const dispatch = useDispatch();

  const callback = async (params) => {
    try {
      // Refresh token when expire
      if (!(await trackPromise(refreshAccessTokenExpire()))) {
        return { success: false, message: IS_REFRESH_TOKEN_FAIL };
      }
      // Call api
      const response = await trackPromise(categoryApi.add(params));
      if (response?.data.success) {
        // Remove info unnecessary
        const data = (({ _id, name }) => ({ _id, name }))(
          response?.data.category
        );
        // Update state
        const action = addCategory(data);
        dispatch(action);
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

export const useCategoryUpdate = () => {
  const dispatch = useDispatch();

  const callback = async (params) => {
    try {
      // Refresh token when expire
      if (!(await trackPromise(refreshAccessTokenExpire()))) {
        return { success: false, message: IS_REFRESH_TOKEN_FAIL };
      }
      // Call api
      const response = await trackPromise(categoryApi.update(params));
      // Update state
      if (response?.data.success) {
        const action = updateCategory(params);
        dispatch(action);
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

export const useCategoryDelete = () => {
  const dispatch = useDispatch();

  const callback = async (params) => {
    try {
      // Refresh token when expire
      if (!(await trackPromise(refreshAccessTokenExpire()))) {
        return { success: false, message: IS_REFRESH_TOKEN_FAIL };
      }
      // Call api
      const response = await trackPromise(categoryApi.delete(params));
      // Update state
      if (response?.data.success) {
        const action = removeCategory(params);
        dispatch(action);
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
