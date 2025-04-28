"use client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled, useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import Header from "../header/Header";

import { useSelector } from "react-redux";
import { useAuth } from "@/hooks/auth";
import Loading from "@/app/loading";
import { PusherProvider } from "@/context/PusherContext";
import { AuthProvider } from "@/context/AuthContext";
import { DialogProvider } from "@/context/DialogContext";
import GlobalDialog from "@/app/components/dialog/GlobalDialog";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  width: "100%",
}));

const PageWrapper = styled("div")(() => ({
  display: "flex",
  flexGrow: 1,
  paddingBottom: "60px",
  flexDirection: "column",
  zIndex: 1,
  width: "100%",
  backgroundColor: "transparent",
}));

export default function Main({ children }) {
  const customizer = useSelector((state) => state.customizer);
  const theme = useTheme();
  const { user } = useAuth({ middleware: "auth" });

  if (!user) {
    console.log("main layout");
    return <Loading />;
  }
  // const can = (permission) => {
  //   return (user?.permissions || []).includes(permission);
  // };
  const hasRole = (...roles) => {
    return user?.role === "admin" || roles.includes(user?.role);
  };

  return (
    <PusherProvider>
      <AuthProvider user={user} hasRole={hasRole}>
        <DialogProvider>
          <MainWrapper>
            {/* ------------------------------------------- */}
            {/* Sidebar */}
            {/* ------------------------------------------- */}

            {/* ------------------------------------------- */}
            {/* Main Wrapper */}
            {/* ------------------------------------------- */}
            <PageWrapper
              className="page-wrapper"
              sx={{
                ...(customizer.isCollapse && {
                  [theme.breakpoints.up("lg")]: {
                    ml: `${customizer.MiniSidebarWidth}px`,
                  },
                }),
              }}
            >
              {/* ------------------------------------------- */}
              {/* Header */}
              {/* ------------------------------------------- */}
              <Header />
              {/* PageContent */}

              <Container
                sx={{
                  maxWidth:
                    customizer.isLayout === "boxed" ? "lg" : "100%!important",
                }}
              >
                {/* ------------------------------------------- */}
                {/* PageContent */}
                {/* ------------------------------------------- */}

                <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
                  {/* <Outlet /> */}
                  {children}
                  {/* <Index /> */}
                </Box>

                {/* ------------------------------------------- */}
                {/* End Page */}
                {/* ------------------------------------------- */}
              </Container>
            </PageWrapper>
          </MainWrapper>

          <GlobalDialog />
        </DialogProvider>
      </AuthProvider>
    </PusherProvider>
  );
}
