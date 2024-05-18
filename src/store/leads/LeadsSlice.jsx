// messageSlice.js

import axios from "@/lib/axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  leads: [],
  //   links: {},
  //   meta: {},
};

const LeadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    getLeads(state, action) {
      state.leads = action.payload;
      //   state.links = action.payload.links;
      //   state.meta = action.payload.meta;
    },
    updateLeads(state) {
      state.error = null;
    },
  },
});

export const { getLeads, updateLeads } = LeadsSlice.actions;
export const fetchLeads = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/v1/leads");

    if (response.data.success) {
      dispatch(getLeads(response.data.data));
    }
  } catch (error) {
    console.log("error in file leadslice");
    console.log(error);
  }
};
export default LeadsSlice.reducer;
