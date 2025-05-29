import axios from "@/lib/axios";
import { createSlice } from "@reduxjs/toolkit";
import { addMessage } from "../message/MessageSlice";

const initialState = {
  data: [], // original unfiltered leads
  count: 0,
  success: false,
  filteredLeads: [], // data shown on UI
  filters: {
    search: "",
    campaign: "all",
    sort: { field: "", direction: "asc" },
  },
};

const LeadsSlice = createSlice({
  name: "leads",
  initialState,
  reducers: {
    getLeads(state, action) {
      state.data = action.payload.data;
      state.count = action.payload.count;
      state.success = action.payload.success;
      LeadsSlice.caseReducers.applyFilters(state); // Apply filters immediately
    },
    addLeads(state, action) {
      state.data = [action.payload, ...state.data];
      state.count += 1;
      LeadsSlice.caseReducers.applyFilters(state);
    },
    updateLead(state, action) {
      const index = state.data.findIndex(
        (lead) => lead.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload.data;
        LeadsSlice.caseReducers.applyFilters(state);
      }
    },
    removeLead(state, action) {
      state.data = state.data.filter((lead) => lead.id !== action.payload);
      state.count -= 1;
      LeadsSlice.caseReducers.applyFilters(state);
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
      LeadsSlice.caseReducers.applyFilters(state);
    },
    applyFilters(state) {
      const { search, campaign, sort } = state.filters;

      let result = [...state.data];

      // Filter by campaign
      if (campaign !== "all") {
        result = result.filter((lead) => lead.campaign.id === campaign);
      }

      // Search by client name or email
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        result = result.filter((lead) => lead.name?.toLowerCase().includes(q));
      }

      // Sort
      if (sort.field) {
        result.sort((a, b) => {
          const aVal = a[sort.field]?.toString().toLowerCase() || "";
          const bVal = b[sort.field]?.toString().toLowerCase() || "";
          if (aVal < bVal) return sort.direction === "asc" ? -1 : 1;
          if (aVal > bVal) return sort.direction === "asc" ? 1 : -1;
          return 0;
        });
      }

      state.filteredLeads = result;
    },
  },
});

export const {
  getLeads,
  addLeads,
  updateLead,
  removeLead,
  setFilters,
  applyFilters,
} = LeadsSlice.actions;

// Fetch All Leads
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

// Fetch Single Lead
export const fetchLeadById = (leadId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/v1/leads/${leadId}`);
    if (response.data.success) {
      // dispatch(updateLead({ id: leadId, data: response.data }));
      return response.data.data; // ✅ Return full lead object
    }
  } catch (error) {
    dispatch(
      addMessage({
        type: "error",
        text: error.response?.data?.message || "Error fetching lead",
      })
    );
    throw error; // Optional: rethrow for caller to handle
  }
};

// Mark Lead as Read
export const markLeadAsRead = (leadId) => async (dispatch) => {
  try {
    const response = await axios.patch(`/api/v1/leads/${leadId}/read`);

    if (response.data.success) {
      const fullLeadData = response.data.data;

      // Update Redux state with full lead object
      dispatch(updateLead({ id: leadId, data: fullLeadData }));

      dispatch(
        addMessage({
          type: "success",
          text: "Lead copied to clipboard!",
        })
      );

      return fullLeadData; // 👈 return the entire lead data object
    }
  } catch (error) {
    dispatch(
      addMessage({
        type: "error",
        text: error.response?.data?.message || "Error marking lead as read",
      })
    );
    throw error;
  }
};

// Delete Lead
export const deleteLead = (leadId, isAdmin) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/leads/${leadId}`);
    if (!isAdmin) dispatch(removeLead(leadId));
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

// Fetch Stats
export const fetchLeadsStats = async () => {
  try {
    const response = await axios.get("/api/v1/stats");
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    console.log("Error fetching leads stats:", error);
    throw error;
  }
};

export default LeadsSlice.reducer;
