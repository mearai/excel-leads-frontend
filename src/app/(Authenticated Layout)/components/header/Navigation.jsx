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
    cursor: "pointer",
  });

  return (
    <>
      <Link href="/" prefetch={false}>
        <Button
          color="inherit"
          sx={{ color: pathname === "/" ? "primary.main" : "text.secondary" }}
          variant="text"
        >
          Home
        </Button>
      </Link>

      {hasRole("seller") && (
        <Link href="/leads" prefetch={false}>
          <Typography sx={linkStyles("/leads")}>Leads</Typography>
        </Link>
      )}

      {hasRole("admin") && (
        <>
          <Link href="/ip-settings" prefetch={false}>
            <Typography sx={linkStyles("/ip-settings")}>IP Settings</Typography>
          </Link>

          <Link href="/users" prefetch={false}>
            <Typography sx={linkStyles("/users")}>Users</Typography>
          </Link>

          <Link href="/user-activity" prefetch={false}>
            <Typography sx={linkStyles("/user-activity")}>
              User Activity
            </Typography>
          </Link>

          <Link href="/campaigns" prefetch={false}>
            <Typography sx={linkStyles("/campaigns")}>Campaigns</Typography>
          </Link>
        </>
      )}
    </>
  );
};

export default Navigation;
