import { configureStore } from '@reduxjs/toolkit';
import appReducer from 'redux/appSlice';
import photoReducer from 'redux/photoSlice';
import categoryReducer from 'redux/categorySlice';
import cookieReducer from 'redux/cookieSlice';

const rootReducer = {
  app: appReducer,
  cookies: cookieReducer,
  photos: photoReducer,
  categories: categoryReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
