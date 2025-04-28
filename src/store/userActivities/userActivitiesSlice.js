// store/features/userActivitySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios"; // adjust path based on your setup

// ✅ Fetch all user activities
export const fetchUserActivities = createAsyncThunk(
  "userActivities/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/api/v1/stats/user-activities");

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ➕ Add a new activity
export const addUserActivity = createAsyncThunk(
  "userActivities/add",
  async (newActivity, thunkAPI) => {
    try {
      const res = await axios.post(
        "/api/v1/stats/user-activities",
        newActivity
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✏️ Update an activity
export const updateUserActivity = createAsyncThunk(
  "userActivities/update",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const res = await axios.put(
        `/api/v1/stats/user-activities/${id}`,
        updatedData
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🗑️ Delete an activity
export const deleteUserActivity = createAsyncThunk(
  "userActivities/delete",
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/api/v1/stats/user-activities/${id}`);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 🔁 Slice
const userActivitySlice = createSlice({
  name: "userActivities",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchUserActivities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
      })
      .addCase(fetchUserActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(addUserActivity.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })

      // UPDATE
      .addCase(updateUserActivity.fulfilled, (state, action) => {
        const index = state.list.findIndex((a) => a.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteUserActivity.fulfilled, (state, action) => {
        state.list = state.list.filter((a) => a.id !== action.payload);
      });
  },
});

export default userActivitySlice.reducer;
