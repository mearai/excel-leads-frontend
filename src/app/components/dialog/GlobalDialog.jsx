import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";

import Slide from "@mui/material/Slide";
import { useGlobalDialog } from "@/context/DialogContext";
import React from "react";
import { IconAlertTriangleFilled, IconInfoCircle } from "@tabler/icons-react";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { IconCircleXFilled } from "@tabler/icons-react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const iconMap = {
  info: <IconInfoCircle style={{ color: "#0288d1" }} />, // Blue
  warning: <IconAlertTriangleFilled style={{ color: "#fbc02d" }} />, // Yellow
  success: <IconCircleCheckFilled style={{ color: "#4caf50" }} />, // Green
  error: <IconCircleXFilled style={{ color: "#f44336" }} />, // Red
};

const GlobalDialog = () => {
  const { dialog, closeDialog } = useGlobalDialog();
  const {
    open,
    title,
    description,
    type,
    icon,
    onConfirm,
    confirmText,
    onCancel,
    cancelText,
    maxWidth,
  } = dialog;

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={(event, reason) => {
        // if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
        closeDialog();
        // }
      }}
      aria-describedby="global-dialog-description"
      maxWidth={`${maxWidth ?? "sm"}`}
      fullWidth={true}
    >
      <DialogTitle>
        <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {icon && iconMap[icon]} {title}
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box id="global-dialog-description">{description}</Box>
      </DialogContent>
      <DialogActions>
        {onCancel && (
          <Button
            onClick={() => {
              onCancel?.();
              closeDialog();
            }}
            color="error"
          >
            {cancelText ?? "Cancel"}
          </Button>
        )}
        {onConfirm && (
          <Button
            onClick={() => {
              onConfirm?.();
              closeDialog();
            }}
          >
            {confirmText ?? "Ok"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default GlobalDialog;
