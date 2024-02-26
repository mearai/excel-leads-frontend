"use client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MessageSnackbar from "../snackbar/MessageSnackbar";
import { ThemeSettings } from "@/utils/theme/Theme";
import { useSelector } from "react-redux";

function ThemeLayout({children}) {
 const theme = ThemeSettings();

  const customizer = useSelector((state) => state.customizer);
  return (
    <ThemeProvider theme={theme}>
            <CssBaseline />
        {children}
        <MessageSnackbar /> 
    </ThemeProvider>
  )
}
export default ThemeLayout