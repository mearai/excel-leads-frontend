"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide"; // Import Slide transition
import { removeMessage } from "@/store/message/MessageSlice";

const MessageSnackbar = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.message.messages); // ✅ Get multiple messages

  const handleClose = (id) => {
    dispatch(removeMessage(id)); // ✅ Remove specific message
  };

  return (
    <>
      {messages.map((msg, index) => {
        return (
          <Snackbar
            key={msg.id}
            open={true} // ✅ Always open since it's managed by Redux
            autoHideDuration={msg.duration ?? 6000}
            onClose={(event, reason) => {
              if (reason === "clickaway") return;
              handleClose(msg.id);
            }}
            TransitionComponent={Slide}
            TransitionProps={{
              direction: "up",
              timeout: { enter: 500, exit: 1000 },
            }}
            sx={{ bottom: `${index * 60}px` }} // ✅ Stack messages properly
          >
            <Alert
              onClose={(event, reason) => {
                if (reason === "clickaway") return;
                handleClose(msg.id);
              }}
              severity={msg.type}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {msg.text}
            </Alert>
          </Snackbar>
        );
      })}
    </>
  );
};

export default MessageSnackbar;
