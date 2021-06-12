import { useDispatch } from 'react-redux';
import { trackPromise } from 'react-promise-tracker';

import { setPhoto, addPhoto, updatePhoto, removePhoto } from 'redux/photoSlice';
import photoApi from 'api/photoApi';
import { timeout, refreshAccessTokenExpire } from 'utils/helper';

import { IS_REFRESH_TOKEN_FAIL } from 'constants/other';

export const usePhotoGetAll = () => {
  const dispatch = useDispatch();

  const callback = async () => {
    try {
      // Call api
      const response = await trackPromise(photoApi.getAll());
      // Update state
      if (response?.data.success) {
        const data = response?.data.photos ? response?.data.photos : [];
        dispatch(setPhoto(data));
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

export const usePhotoPublic = () => {
  const dispatch = useDispatch();

  const callback = async () => {
    try {
      // Call api
      const response = await trackPromise(photoApi.getPublic());
      // Update state
      if (response?.data.success) {
        const data = response?.data.photos ? response?.data.photos : [];
        dispatch(setPhoto(data));
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

export const usePhotoGetByUser = () => {
  const dispatch = useDispatch();

  const callback = async (params) => {
    try {
      // Refresh token when expire
      if (!(await trackPromise(refreshAccessTokenExpire()))) {
        return { success: false, message: IS_REFRESH_TOKEN_FAIL };
      }
      // Call api
      const response = await trackPromise(photoApi.getByUser());
      // Update state
      if (response?.data.success) {
        const data = response?.data.photos ? response?.data.photos : [];
        dispatch(setPhoto(data));
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

export const usePhotoAdd = () => {
  const dispatch = useDispatch();

  const callback = async (params) => {
    try {
      // Refresh token when expire
      if (!(await trackPromise(refreshAccessTokenExpire()))) {
        return { success: false, message: IS_REFRESH_TOKEN_FAIL };
      }
      // Call api
      const response = await trackPromise(photoApi.add(params));
      // Update state
      if (response?.data.success) {
        const action = addPhoto(response?.data.photo);
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

export const usePhotoUpdate = () => {
  const dispatch = useDispatch();

  const callback = async (params) => {
    try {
      // Refresh token when expire
      if (!(await trackPromise(refreshAccessTokenExpire()))) {
        return { success: false, message: IS_REFRESH_TOKEN_FAIL };
      }
      // Call api
      const response = await trackPromise(photoApi.update(params));
      // Update state
      if (response?.data.success) {
        const action = updatePhoto(params);
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

export const usePhotoDelete = () => {
  const dispatch = useDispatch();

  const callback = async (params) => {
    try {
      // Refresh token when expire
      if (!(await trackPromise(refreshAccessTokenExpire()))) {
        return { success: false, message: IS_REFRESH_TOKEN_FAIL };
      }
      // Call api
      const response = await trackPromise(photoApi.delete(params));
      // Update state
      if (response?.data.success) {
        const action = removePhoto(params);
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
