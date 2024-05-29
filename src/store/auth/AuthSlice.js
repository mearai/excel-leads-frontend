// store/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
//   const response = await axios.get("/api/user");
//   return response.data;
// });

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = authSlice.actions;

export default authSlice.reducer;
