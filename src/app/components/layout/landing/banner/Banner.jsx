import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import BannerContent from "./BannerContent";

const Banner = () => {
  return (
    <Box
      height="650px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ overflow: "hidden" }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12}>
            <BannerContent />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Banner;
