// dashboard/notificationsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [
    {
    
    title: "Roman Joined the Team!",
    subtitle: "Congratulate him",
  },
  {
    
    title: "New message received",
    subtitle: "Salma sent you new message",
  },
  {
    
    title: "New Payment received",
    subtitle: "Check your earnings",
  },
  {
    
    title: "Jolly completed tasks",
    subtitle: "Assign her new tasks",
  },
  {
    
    title: "Roman Joined the Team!",
    subtitle: "Congratulate him",
  },
  {
    
    title: "New message received",
    subtitle: "Salma sent you new message",
  },
  {
    
    title: "New Payment received",
    subtitle: "Check your earnings",
  },
  {
    
    title: "Jolly completed tasks",
    subtitle: "Assign her new tasks",
  },
  ],
};

const NotificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification(state, action) {
      state.notifications.push(action.payload);
    },
    removeNotification(state, action) {
      state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
    },
    clearNotifications(state) {
      state.notifications = [];
    },
  },
});

export const { addNotification, removeNotification, clearNotifications } = NotificationsSlice.actions;

export default NotificationsSlice.reducer;
