import { createSlice } from '@reduxjs/toolkit';

const app = createSlice({
  name: 'app',
  initialState: {
    isPleaseLogin: false,
    isShowLoading: false,
    modalOk: {},
    modalOkCancel: {},
    modalYesNoCancel: {},
  },
  reducers: {
    setPleaseLogin(state, action) {
      state.isPleaseLogin = action.payload;
    },
    showLoading(state, action) {
      state.isShowLoading = action.payload;
    },
    showModalOk(state, action) {
      state.modalOk = action.payload;
    },
    showModalOkCancel(state, action) {
      state.modalOkCancel = action.payload;
    },
    showModalYesNoCancel(state, action) {
      state.modalYesNoCancel = action.payload;
    },
  },
});

const { reducer, actions } = app;
export const {
  setPleaseLogin,
  showLoading,
  showModalOk,
  showModalOkCancel,
  showModalYesNoCancel,
} = actions;
export default reducer;
