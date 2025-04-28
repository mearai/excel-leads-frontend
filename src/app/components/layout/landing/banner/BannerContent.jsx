import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const BannerContent = () => {
  return (
    <Box mt={8}>
      <Typography variant="h1" fontWeight={900}>
        <Typography component={"span"} variant="inherit" color={"primary"}>
          Flow Digital
        </Typography>{" "}
        Lead Management
      </Typography>
      {/* <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={3}>
        <Button
          sx={{
            padding: "13px 48px",
            fontSize: "16px",
          }}
          direction="row"
          spacing={2}
          alignItems="center"
          variant="contained"
          color="primary"
          href="/login"
        >
          Login
        </Button>
      </Stack> */}
    </Box>
  );
};

export default BannerContent;
