import React, { createContext, useContext, useState } from "react";

const DialogContext = createContext();

export const useGlobalDialog = () => useContext(DialogContext);

export const DialogProvider = ({ children }) => {
  const [dialog, setDialog] = useState({
    open: false,
    type: "alert", // "alert" or "confirm"
    title: "",
    description: "",
    icon: null,
    onConfirm: null,
    confirmText: "",
    onCancel: null,
    cancelText: "",
    maxWidth: "",
  });

  const showDialog = (options) => {
    setDialog({ open: true, ...options });
  };

  const closeDialog = () => {
    setDialog((prev) => ({ ...prev, open: false }));
  };

  return (
    <DialogContext.Provider value={{ dialog, showDialog, closeDialog }}>
      {children}
    </DialogContext.Provider>
  );
};
