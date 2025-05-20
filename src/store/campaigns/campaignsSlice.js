import { createSlice } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { addMessage } from "../message/MessageSlice";

const initialState = {
  campaigns: [],
  loading: false,
};

const campaignsSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    setCampaigns(state, action) {
      state.campaigns = action.payload;
    },
    addCampaign(state, action) {
      state.campaigns.unshift(action.payload);
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setCampaigns, addCampaign, setLoading } = campaignsSlice.actions;

export const fetchCampaigns = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get("/api/v1/campaigns");
    dispatch(setCampaigns(res.data.data));
  } catch (err) {
    dispatch(
      addMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to fetch campaigns",
      })
    );
  } finally {
    dispatch(setLoading(false));
  }
};

export const createCampaign = (payload) => async (dispatch) => {
  try {
    const res = await axios.post("/api/v1/campaigns", payload);
    dispatch(addCampaign(res.data.data));
    dispatch(
      addMessage({
        type: "success",
        text: "Campaign created successfully",
      })
    );
  } catch (err) {
    dispatch(
      addMessage({
        type: "error",
        text: err.response?.data?.message || "Failed to create campaign",
      })
    );
  }
};

export default campaignsSlice.reducer;
