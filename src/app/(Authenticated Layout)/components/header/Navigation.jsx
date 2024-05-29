import Button from "@mui/material/Button";

import Link from "next/link";

const Navigation = () => {
  return (
    <>
      <Button
        color="inherit"
        sx={{ color: (theme) => theme.palette.text.secondary }}
        variant="text"
        href="/"
        component={Link}
      >
        Home
      </Button>
      <Button
        color="inherit"
        sx={{ color: (theme) => theme.palette.text.secondary }}
        variant="text"
        href="/stats"
        component={Link}
      >
        Stats
      </Button>
    </>
  );
};

export default Navigation;
