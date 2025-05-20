import axios from "@/lib/axios";
import { createSlice } from "@reduxjs/toolkit";
import { addMessage } from "../message/MessageSlice";

const initialState = {
  data: [],
  count: 0,
};

const ipsSlice = createSlice({
  name: "ips",
  initialState,
  reducers: {
    getIps(state, action) {
      state.data = action.payload.data;
      state.count = action.payload.data.length;
    },
    addIp(state, action) {
      state.data = [action.payload, ...state.data];
      state.count += 1;
    },
    updateIp(state, action) {
      const index = state.data.findIndex((ip) => ip.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload.data };
      }
    },
    removeIp(state, action) {
      state.data = state.data.filter((ip) => ip.id !== action.payload);
      state.count -= 1;
    },
  },
});

export const { getIps, addIp, updateIp, removeIp } = ipsSlice.actions;

// Thunk to fetch IPs
export const fetchIps = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/v1/whitelist");
    dispatch(getIps(response.data));
  } catch (error) {
    dispatch(
      addMessage({
        type: "error",
        text: `Error fetching IPs! ${error?.response?.data.message}`,
      })
    );
  }
};

// Thunk to add a new IP
export const createIp = (ipData) => async (dispatch) => {
  try {
    const response = await axios.post("/api/v1/whitelist", ipData);
    if (response.data.success === true) {
      dispatch(addIp(response.data.data));
      dispatch(
        addMessage({
          type: "success",
          text: "IP whitelisted successfully!",
        })
      );
    } else {
      dispatch(
        addMessage({
          type: "warning",
          text: "Something went wrong!",
        })
      );
    }
  } catch (error) {
    dispatch(
      addMessage({
        type: "error",
        text: `Error whitelisting IP! ${error?.response?.data.message}`,
      })
    );
  }
};

// Thunk to update an existing IP
export const modifyIp = (ipId, ipData) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/v1/whitelist/${ipId}`, ipData);
    dispatch(updateIp({ id: ipId, data: ipData }));
    dispatch(
      addMessage({
        type: "success",
        text: "IP updated successfully!",
      })
    );
  } catch (error) {
    dispatch(
      addMessage({
        type: "error",
        text: `Error updating IP! ${error?.response?.data.message}`,
      })
    );
  }
};

// Thunk to delete an IP
export const deleteIp = (ipId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/whitelist/${ipId}`);
    dispatch(removeIp(ipId));
    dispatch(
      addMessage({
        type: "success",
        text: "IP deleted successfully!",
      })
    );
  } catch (error) {
    dispatch(
      addMessage({
        type: "error",
        text: `Error deleting IP! ${error?.response?.data.message}`,
      })
    );
  }
};

export default ipsSlice.reducer;
