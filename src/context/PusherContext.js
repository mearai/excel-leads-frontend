// context/PusherContext.js
import React, { createContext, useEffect, useContext } from "react";
import Pusher from "pusher-js";
import { useDispatch } from "react-redux";
import { addLeads } from "@/store/leads/LeadsSlice"; // Adjust the import path according to your project
import { addMessage } from "@/store/message/MessageSlice";

const PusherContext = createContext();

export const usePusher = () => useContext(PusherContext);

export const PusherProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialize Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    });

    // Subscribe to the 'leads' channel
    const channel = pusher.subscribe("leads");

    // Bind to the 'LeadCreated' event
    channel.bind("lead-create", function (message) {
      console.log(message);
      if (message) {
        dispatch(addLeads(message.lead));

        dispatch(
          addMessage({
            type: "success",
            text: "New Lead Received!",
          })
        );
        playNotificationSound();
      }
    });

    // Cleanup on component unmount
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [dispatch]);

  const playNotificationSound = () => {
    const audio = new Audio("/correct.mp3");
    audio.play();
  };

  return <PusherContext.Provider value={{}}>{children}</PusherContext.Provider>;
};
