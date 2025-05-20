import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";

// import counterReducer from "./counter/counterSlice";
import CustomizerReducer from "./customizer/CustomizerSlice";
import MessageReducer from "./message/MessageSlice";
import NotificationReducer from "./notification/NotificationSlice";
import LeadsReducer from "./leads/LeadsSlice";
import AuthReducer from "./auth/AuthSlice";
import SellerReducer from "./seller/SellerSlice";
import UsersReducer from "./users/UsersSlice";
import IpsReducer from "./ip/ipSlice";
import UserActivitiesReducer from "./userActivities/userActivitiesSlice";
import CampaignsReducer from "./campaigns/campaignsSlice";
// import EcommerceReducer from "./apps/eCommerce/ECommerceSlice";
// import ChatsReducer from "./apps/chat/ChatSlice";
// import NotesReducer from "./apps/notes/NotesSlice";
// import EmailReducer from "./apps/email/EmailSlice";
// import TicketReducer from "./apps/tickets/TicketSlice";
// import ContactsReducer from "./apps/contacts/ContactSlice";
// import UserProfileReducer from "./apps/userProfile/UserProfileSlice";
// import BlogReducer from "./apps/blog/BlogSlice";
let _store; // this will hold the active store
export const makeStore = () => {
  _store = configureStore({
    reducer: {
      // counter: counterReducer,
      customizer: CustomizerReducer,
      message: MessageReducer,
      notifications: NotificationReducer,
      leads: LeadsReducer,
      auth: AuthReducer,
      sellers: SellerReducer,
      users: UsersReducer,
      ips: IpsReducer,
      userActivities: UserActivitiesReducer,
      campaigns: CampaignsReducer,
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
  return _store;
};
export const getStore = () => _store;
// export const store = configureStore({
//   reducer: {
//     // counter: counterReducer,
//     customizer: CustomizerReducer,
//     message: MessageReducer,
//     notifications: NotificationReducer,
//     leads: LeadsReducer,
//     auth: authReducer,
//     // ecommerceReducer: EcommerceReducer,
//     // chatReducer: ChatsReducer,
//     // emailReducer: EmailReducer,
//     // notesReducer: NotesReducer,
//     // contactsReducer: ContactsReducer,
//     // ticketReducer: TicketReducer,
//     // userpostsReducer: UserProfileReducer,
//     // blogReducer: BlogReducer,
//   },
//   devTools: process.env.NODE_ENV !== "production",
// });
