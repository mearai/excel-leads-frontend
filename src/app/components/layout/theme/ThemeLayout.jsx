"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MessageSnackbar from "../snackbar/MessageSnackbar";
import { ThemeSettings } from "@/utils/theme/Theme";
import { useSelector } from "react-redux";
import { StoreProvider } from "@/store/Provider";

export const MyApp = ({ children }) => {
  const theme = ThemeSettings();

  const customizer = useSelector((state) => state.customizer);

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  );
};
function ThemeLayout({ children }) {
  return (
    <StoreProvider>
      <MyApp>{children}</MyApp>
      <MessageSnackbar />
    </StoreProvider>
  );
}
export default ThemeLayout;
