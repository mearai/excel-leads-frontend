"use client";
import { useRouter } from "next/navigation";
import { Link, Typography } from "@mui/material";
import { IconArrowLeft } from "@tabler/icons-react";

const GoBack = () => {
  const router = useRouter();

  return (
    <Link
      component="button"
      onClick={() => router.back()}
      sx={{ display: "flex", alignItems: "center", mb: 2 }}
      underline="hover"
    >
      <IconArrowLeft sx={{ mr: 1 }} />
      <Typography variant="body1">Go Back</Typography>
    </Link>
  );
};

export default GoBack;
