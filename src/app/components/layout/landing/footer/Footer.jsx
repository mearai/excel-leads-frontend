import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const Footer = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} justifyContent="center" mt={4}>
        <Grid item xs={12} sm={5} lg={4} textAlign="center">
          <Image
            src="/images/logos/logoIcon.svg"
            alt="icon"
            width={35}
            height={35}
          />
          <Typography fontSize="16" color="textSecondary" mt={1} mb={1}>
            All rights reserved by Flow digital. Designed & Developed by
            <Typography color="textSecondary" component="span" display="inline">
              {" "}
              Flow digital
            </Typography>{" "}
            .
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
