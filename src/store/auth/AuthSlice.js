// store/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
//   const response = await axios.get("/api/user");
//   return response.data;
// });

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    status: "idle",
    error: null,
    currentUserEmail: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    setCurrentUserEmail: (state, action) => {
      console.log("Action Invoked : " + action.payload);
      state.currentUserEmail = action.payload;
    },
    clearCurrentUserEmail: (state) => {
      state.currentUserEmail = null;
    },
  },
});

export const {
  setCurrentUser,
  clearCurrentUser,
  setCurrentUserEmail,
  clearCurrentUserEmail,
} = AuthSlice.actions;

export default AuthSlice.reducer;
