import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";

export default function ButtonWithLoading({ text, color, loading, sx }) {
  return (
    <Box sx={{ position: "relative", ...sx }}>
      <Button
        color={color ? color : "primary"}
        variant="contained"
        size="large"
        fullWidth
        type="submit"
        disabled={loading}
      >
        {text}
      </Button>
      {loading && (
        <CircularProgress
          size={24}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: "-12px",
            marginLeft: "-12px",
          }}
        />
      )}
    </Box>
  );
}
