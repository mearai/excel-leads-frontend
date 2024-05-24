"use client";
import Link from "next/link";
import { Grid, Box, Stack, Typography } from "@mui/material";
import PageContainer from "@/app/components/container/PageContainer";
import Logo from "@/app/components/layout/logo/Logo";
import AuthLogin from "@/app/components/authForms/AuthLogin";
import Image from "next/image";
import LpHeader from "@/app/components/layout/landing/header/Header";
import Banner from "@/app/components/layout/landing/banner/Banner";
import Footer from "@/app/components/layout/landing/footer/Footer";

export default function Login() {
  return (
    <PageContainer title="Login Page" description="Flow digital login">
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: "100vh" }}
        className="Main"
      >
        <Grid
          item
          xs={12}
          sm={12}
          lg={7}
          xl={8}
          sx={{
            position: "relative",
            "&:before": {
              content: '""',
              background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
              backgroundSize: "400% 400%",
              animation: "gradient 15s ease infinite",
              position: "absolute",
              height: "100%",
              width: "100%",
              opacity: "0.3",
            },
          }}
        >
          <Box position="relative">
            <Box px={3}>
              <Logo />
            </Box>

            <Banner />

            <Footer />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          lg={5}
          xl={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box width={"80%"} p={4}>
            <AuthLogin title="Login" />
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

Login.layout = "Blank";
