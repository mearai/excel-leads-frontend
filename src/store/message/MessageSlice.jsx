import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [], // ✅ Store multiple messages
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const randomDigits = Math.floor(100 + Math.random() * 900);
      const newMessage = {
        id: `${Date.now()}${randomDigits}`,
        ...action.payload,
      };
      state.messages.push(newMessage);
    },
    removeMessage: (state, action) => {
      state.messages = state.messages.filter(
        (msg) => msg.id !== action.payload
      );
    },
    clearMessages: (state) => {
      state.messages = []; // ✅ Clear all messages
    },
  },
});

export const { addMessage, removeMessage, clearMessages } =
  messageSlice.actions;
export default messageSlice.reducer;
