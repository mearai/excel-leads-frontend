import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";

// import counterReducer from "./counter/counterSlice";
import CustomizerReducer from "./customizer/CustomizerSlice";
import MessageReducer from "./message/MessageSlice";
import NotificationReducer from "./notification/NotificationSlice";
import LeadsReducer from "./leads/LeadsSlice";
// import EcommerceReducer from "./apps/eCommerce/ECommerceSlice";
// import ChatsReducer from "./apps/chat/ChatSlice";
// import NotesReducer from "./apps/notes/NotesSlice";
// import EmailReducer from "./apps/email/EmailSlice";
// import TicketReducer from "./apps/tickets/TicketSlice";
// import ContactsReducer from "./apps/contacts/ContactSlice";
// import UserProfileReducer from "./apps/userProfile/UserProfileSlice";
// import BlogReducer from "./apps/blog/BlogSlice";

export const store = configureStore({
  reducer: {
    // counter: counterReducer,
    customizer: CustomizerReducer,
    message: MessageReducer,
    notifications: NotificationReducer,
    leads: LeadsReducer,
    // ecommerceReducer: EcommerceReducer,
    // chatReducer: ChatsReducer,
    // emailReducer: EmailReducer,
    // notesReducer: NotesReducer,
    // contactsReducer: ContactsReducer,
    // ticketReducer: TicketReducer,
    // userpostsReducer: UserProfileReducer,
    // blogReducer: BlogReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
