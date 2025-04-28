// sellersSlice.js

import axios from "@/lib/axios";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  count: 0,
  success: false,
};

const sellersSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {
    getSellers(state, action) {
      state.data = action.payload.data;
      state.count = action.payload.data.length; // Count is based on the number of sellers
      state.success = action.payload.success;
    },
    addSeller(state, action) {
      state.data = [action.payload, ...state.data];
      state.count += 1;
    },
    updateSeller(state, action) {
      const index = state.data.findIndex(
        (seller) => seller.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...action.payload.data };
      }
    },
    removeSeller(state, action) {
      state.data = state.data.filter((seller) => seller.id !== action.payload);
      state.count -= 1;
    },
  },
});

export const { getSellers, addSeller, updateSeller, removeSeller } =
  sellersSlice.actions;

// Thunk to fetch sellers
export const fetchSellers = () => async (dispatch) => {
  try {
    const response = await axios.get("/api/v1/sellers");

    if (response.data.success) {
      dispatch(getSellers(response.data));
    }
  } catch (error) {
    console.error("Error fetching sellers: ", error);
    throw error;
  }
};

// Thunk to add a new seller
export const createSeller = (sellerData) => async (dispatch) => {
  try {
    const response = await axios.post("/api/v1/sellers", sellerData);

    if (response.data.success) {
      dispatch(addSeller(response.data.data));
    }
  } catch (error) {
    console.error("Error creating seller: ", error);
    throw error;
  }
};

// Thunk to update an existing seller
export const modifySeller = (sellerId, sellerData) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/v1/sellers/${sellerId}`, sellerData);

    if (response.data.success) {
      dispatch(updateSeller({ id: sellerId, data: sellerData }));
    }
  } catch (error) {
    console.error("Error updating seller: ", error);
    throw error;
  }
};

// Thunk to delete a seller
export const deleteSeller = (sellerId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/sellers/${sellerId}`);
    dispatch(removeSeller(sellerId));
  } catch (error) {
    console.error("Error deleting seller: ", error);
    throw error;
  }
};

export default sellersSlice.reducer;
