// messageSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: '',
  success: '',
};

const MessageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setGlobalError(state, action) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setGlobalSuccess(state, action) {
      state.success = action.payload;
    },
    clearSuccess(state) {
      state.success = null;
    },
  },
});

export const { setGlobalError, clearError, setGlobalSuccess, clearSuccess } = MessageSlice.actions;

export default MessageSlice.reducer;
