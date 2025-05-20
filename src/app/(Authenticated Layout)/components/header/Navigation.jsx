import { useAuthContext } from "@/context/AuthContext";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const Navigation = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { hasRole } = useAuthContext();
  const pathname = usePathname(); // Get the current route

  const linkStyles = (path) => ({
    textDecoration: "none",
    color: pathname === path ? "primary.main" : "text.secondary", // Active link color
    fontWeight: 500,
    margin: "0 12px", // Consistent spacing between items
  });

  return (
    <>
      <Button
        color="inherit"
        sx={{ color: pathname === "/" ? "primary.main" : "text.secondary" }}
        variant="text"
        href="/"
        component={Link}
      >
        Home
      </Button>

      {hasRole("seller") && (
        <>
          <Typography component={Link} href="/leads" sx={linkStyles("/leads")}>
            Leads
          </Typography>
        </>
      )}
      {hasRole("admin") && (
        <>
          <Typography
            component={Link}
            href="/ip-settings"
            sx={linkStyles("/ip-settings")}
          >
            IP Settings
          </Typography>
          <Typography component={Link} href="/users" sx={linkStyles("/users")}>
            Users
          </Typography>
          <Typography
            component={Link}
            href="/user-activity"
            sx={linkStyles("/user-activity")}
          >
            User Activity
          </Typography>
          <Typography
            component={Link}
            href="/campaigns"
            sx={linkStyles("/campaigns")}
          >
            Campaigns
          </Typography>
        </>
      )}
    </>
  );
};

export default Navigation;
