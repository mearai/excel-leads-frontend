// messageSlice.js

import axios from "@/lib/axios";
import { createSlice } from "@reduxjs/toolkit";
import { addMessage } from "../message/MessageSlice";

const initialState = {
  data: [],
  count: 0,
  success: false,
  //   links: {},
  //   meta: {},
};

const LeadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    getLeads(state, action) {
      state.data = action.payload.data;
      state.count = action.payload.count;
      state.success = action.payload.success;
      //   state.links = action.payload.links;
      //   state.meta = action.payload.meta;
    },
    addLeads(state, action) {
      state.data = [action.payload, ...state.data];
      state.count += 1;
    },
    updateLead(state, action) {
      const index = state.data.findIndex(
        (lead) => lead.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload.data; // full replacement
      }
    },
    removeLead(state, action) {
      state.data = state.data.filter((lead) => lead.id !== action.payload);
    },
  },
});

export const { getLeads, addLeads, updateLead, removeLead } =
  LeadsSlice.actions;
export const fetchLeads = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/v1/leads");

    if (response.data.success) {
      dispatch(getLeads(response.data));
    }
  } catch (error) {
    dispatch(
      addMessage({
        type: "error",
        text: error.response?.data?.message || "Error fetching leads",
      })
    );
  }
};
export const fetchLeadById = (leadId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/v1/leads/${leadId}`);

    if (response.data.success) {
      dispatch(updateLead({ id: leadId, data: response.data })); // Update state
    }
  } catch (error) {
    dispatch(
      addMessage({
        type: "error",
        text: error.response?.data?.message || "Error fetching leads",
      })
    );
  }
};
// Update lead as read
export const markLeadAsRead = (leadId) => async (dispatch) => {
  try {
    const response = await axios.patch(`/api/v1/leads/${leadId}/read`);
    if (response.data.success) {
      dispatch(updateLead({ id: leadId, data: response.data.data })); // Update state
      console.log("Lead updated successfully!");
      // dispatch(
      //   addMessage({
      //     type: "success",
      //     text: "Lead copied to clipboard!",
      //   })
      // );
      console.log(response.data.data);
    }
  } catch (error) {
    // dispatch(
    //   addMessage({
    //     type: "error",
    //     text: error.response?.data?.message || "Error copying to clipboard: ",
    //   })
    // );
    console.log(error.response?.data?.message || "Error marking lead as read");
  }
};
// Delete lead
export const deleteLead = (leadId, isAdmin) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/leads/${leadId}`); // API call to delete the lead
    if (!isAdmin) dispatch(removeLead(leadId)); // Update state to remove the lead
    dispatch(
      addMessage({
        type: "success",
        text: "Lead deleted successfully!",
      })
    );
  } catch (error) {
    dispatch(
      addMessage({
        type: "error",
        text: error.response?.data?.message || "Error deleting lead",
      })
    );
  }
};
export const fetchLeadsStats = async () => {
  try {
    const response = await axios.get("/api/v1/stats");
    if (response.data.success) {
      console.log(response.data);
      return response.data.data;
    }
  } catch (error) {
    console.log("Error fetching leads stats:", error);
    throw error; // Throw the error to be caught by the caller
  }
};
export default LeadsSlice.reducer;
