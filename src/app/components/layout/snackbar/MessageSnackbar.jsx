"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide"; // Import Slide transition
import { clearError, clearSuccess } from "@/store/message/MessageSlice";

const MessageSnackbar = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.message.error);
  const successMessage = useSelector((state) => state.message.success);
  const [open, setOpen] = useState(false);
  const [localErrorMessage, setLocalErrorMessage] = useState("");
  const [localSuccessMessage, setLocalSuccessMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    if (errorMessage || successMessage) {
      setOpen(true);
      if (errorMessage) {
        setLocalErrorMessage(errorMessage);
      }
      if (successMessage) {
        setLocalSuccessMessage(successMessage);
      }
    }
  }, [errorMessage, successMessage]);

  const handleExited = () => {
    dispatch(clearError());
    dispatch(clearSuccess());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      TransitionComponent={Slide} // Use Slide transition
      TransitionProps={{
        direction: "up",
        timeout: { enter: 500, exit: 1000 },
        onExited: handleExited,
      }} // Adjust timeout as needed
    >
      {localErrorMessage ? (
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {localErrorMessage}
        </Alert>
      ) : (
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {localSuccessMessage}
        </Alert>
      )}
    </Snackbar>
  );
};

export default MessageSnackbar;
