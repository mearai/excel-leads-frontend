"use client";

import { fetchLeadsStats } from "@/store/leads/LeadsSlice";
import { useEffect, useState } from "react";

import { Grid } from "@mui/material";
import withRole from "@/hoc/withRole";
import UserActivitiesTable from "../components/table/UserActivitiesTable";
function Page() {
  return (
    <Grid container spacing={3} paddingTop={"40px"}>
      <Grid item xs={12}>
        <UserActivitiesTable />
      </Grid>
    </Grid>
  );
}

export default withRole(Page, "admin");
