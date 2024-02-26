'use client'
import { ThemeSettings } from "@/utils/theme/Theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Loading from "../loading";
import { useAuth } from "@/hooks/auth";

 const AuthenticatedLayout = ({ children }) => {
  const theme = ThemeSettings();
const { user } = useAuth({ middleware: 'auth' });
    
    if (!user) {
        return <Loading />;
    }

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
export default AuthenticatedLayout;