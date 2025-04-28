"use client";

import { fetchLeadsStats } from "@/store/leads/LeadsSlice";
import { useEffect, useState } from "react";
import Leads from "../components/widgets/charts/Leads";
import YearlySales from "../components/widgets/charts/Yearly";
import { Grid } from "@mui/material";
import withRole from "@/hoc/withRole";
import UserActivitiesTable from "../components/table/UserActivitiesTable";
function Page() {
  const [leadsCount, setLeadsCount] = useState([]);
  const [stats, setStats] = useState([]);

  const fetchStats = async () => {
    const stats = await fetchLeadsStats(); // Fetch leads stats
    console.log(stats);
    setLeadsCount(stats.last_15_days); // Update leads count state
    setStats(stats); // Update leads count state
  };
  useEffect(() => {
    if (leadsCount.length >= 0) {
      fetchStats(); // Call the fetchStats function
    }
  }, []);

  return (
    <Grid container spacing={3} paddingTop={"40px"}>
      <Grid item xs={12} sm={6}>
        <Leads leadscount={leadsCount} data={stats.last_15_days} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <YearlySales data={stats.last_12_months} />
      </Grid>
      <Grid item xs={12}>
        <UserActivitiesTable />
      </Grid>
    </Grid>
  );
}

export default withRole(Page, "admin");
