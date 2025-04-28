import axios from "@/lib/axios";
import { createSlice } from "@reduxjs/toolkit";
import { addMessage } from "../message/MessageSlice";

const initialState = {
  data: [],
  count: 0,
  success: false,
};

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers(state, action) {
      state.data = action.payload.data;
      state.count = action.payload.data.length;
      state.success = action.payload.success;
    },
    addUser(state, action) {
      state.data = [...state.data, action.payload.user];
      state.count += 1;
    },
    updateUser(state, action) {
      const index = state.data.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload.data };
      }
    },
    removeUser(state, action) {
      state.data = state.data.filter((user) => user.id !== action.payload);
      state.count -= 1;
    },
  },
});

export const { getUsers, addUser, updateUser, removeUser } = UsersSlice.actions;

// Thunk to fetch users
export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/v1/agents");
    dispatch(getUsers(response.data));
    console.log(" fetching agents: ", response.data);
  } catch (error) {
    console.error("Error fetching agents: ", error);
    throw error;
  }
};

// Thunk to add a new user
export const createUser =
  (userData, resetForm, closeDialog) => async (dispatch) => {
    try {
      const response = await axios.post("/api/v1/agents", userData);
      console.log("closeDialog");
      console.log(closeDialog);
      if (response.data.success) {
        dispatch(
          addMessage({
            type: "success",
            text: "Agent created successfully!",
          })
        );
        dispatch(addUser(response.data));
        resetForm();
        closeDialog?.();
      } else {
        dispatch(
          addMessage({
            type: "error",
            text: "Error creating agent!",
          })
        );
      }
    } catch (error) {
      dispatch(
        addMessage({
          type: "error",
          text: error.response?.data?.message || "Error creating agent!",
        })
      );
    }
  };

// Thunk to update an existing user
export const modifyUser = (userId, userData) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/v1/agents/${userId}`, userData);
    dispatch(updateUser({ id: userId, data: userData }));
  } catch (error) {
    console.error("Error updating agents: ", error);
    throw error;
  }
};

// Thunk to delete a user
export const deleteUser = (userId) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/v1/agents/${userId}`);
    console.log(response);
    if (response.data.success) {
      dispatch(
        addMessage({
          type: "success",
          text: "Agent deleted successfully!",
        })
      );

      dispatch(removeUser(userId));
    } else {
      dispatch(
        addMessage({
          type: "error",
          text: "Error deleting agent!",
        })
      );
    }
  } catch (error) {
    dispatch(
      addMessage({
        type: "error",
        text: error.response?.data?.message || "Error deleting agent",
      })
    );
  }
};

export default UsersSlice.reducer;
