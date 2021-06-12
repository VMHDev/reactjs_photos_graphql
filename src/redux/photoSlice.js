import { createSlice } from '@reduxjs/toolkit';

import { addToLocalStorageArray } from 'utils/helper';

const initPhotos = () => {
  const photos = localStorage.getItem('photos');
  const dataPhotos = photos ? JSON.parse(photos) : null;
  if (dataPhotos?.data) {
    return dataPhotos;
  } else {
    return { data: [] };
  }
};

const initialState = initPhotos();

const photo = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setPhoto: (state, action) => {
      state.data = action.payload;

      // Store local storage
      localStorage.setItem('photos', JSON.stringify(state));
    },
    addPhoto: (state, action) => {
      state.data.push(action.payload);

      // Store local storage
      addToLocalStorageArray('photos', action.payload);
    },
    removePhoto: (state, action) => {
      const removePhotoId = action.payload;
      state.data = state.data.filter((photo) => photo._id !== removePhotoId);

      // Store local storage
      localStorage.setItem('photos', JSON.stringify(state));
      return state;
    },
    updatePhoto: (state, action) => {
      const udpPhoto = action.payload;
      const photoIndex = state.data.findIndex(
        (photo) => photo._id === udpPhoto._id
      );
      if (photoIndex >= 0) {
        state.data[photoIndex] = udpPhoto;
      }
      // Store local storage
      localStorage.setItem('photos', JSON.stringify(state));
    },
  },
});

const { reducer, actions } = photo;
export const { setPhoto, addPhoto, removePhoto, updatePhoto } = actions;
export default reducer;
