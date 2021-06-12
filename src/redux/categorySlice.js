import { createSlice } from '@reduxjs/toolkit';

import { addToLocalStorageArray } from 'utils/helper';

const initCategories = () => {
  const categories = localStorage.getItem('categories');
  const dataCategories = categories ? JSON.parse(categories) : null;
  if (dataCategories?.data) {
    return dataCategories;
  } else {
    return { data: [] };
  }
};

const initialState = initCategories();

const category = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.data = action.payload;

      // Store local storage
      localStorage.setItem('categories', JSON.stringify(state));
    },
    addCategory: (state, action) => {
      state.data.push(action.payload);

      // Store local storage
      addToLocalStorageArray('categories', action.payload);
    },
    removeCategory: (state, action) => {
      const removeCategoryId = action.payload;
      state.data = state.data.filter(
        (category) => category._id !== removeCategoryId
      );

      // Store local storage
      localStorage.setItem('categories', JSON.stringify(state));
      return state;
    },
    updateCategory: (state, action) => {
      const udpCategory = action.payload;
      const categoryIndex = state.data.findIndex(
        (category) => category._id === udpCategory._id
      );
      if (categoryIndex >= 0) {
        state.data[categoryIndex] = udpCategory;
      }
      // Store local storage
      localStorage.setItem('categories', JSON.stringify(state));
    },
  },
});

const { reducer, actions } = category;
export const { setCategory, addCategory, removeCategory, updateCategory } =
  actions;
export default reducer;
