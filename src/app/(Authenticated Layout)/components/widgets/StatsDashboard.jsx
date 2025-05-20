"use client";
import React, { useEffect, useState } from "react";
import axios from "@/lib/axios";
import LeadsTrendChart from "./charts/LeadsTrendChart";
import MonthlyLeadsChart from "./charts/MonthlyLeadsChart";
import SkeletonCharts from "./skeletons/SkeletonCharts";
import Loading from "@/app/loading";
import { Grid } from "@mui/material";
import useSWR from "swr";
const fetcher = (url) => axios.get(url).then((res) => res.data.data);
const StatsDashboard = () => {
  const { data: stats, isLoading } = useSWR("/api/v1/stats", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  if (isLoading) return <Loading />;

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>📊 Stats Dashboard</h1>
      <p>Total Leads: {stats?.leads_created}</p>
      <p>Failed Login Attempts: {stats?.failed_login.count}</p>

      <Grid container spacing={3} paddingTop={"40px"}>
        <Grid item xs={12} sm={6}>
          {!stats ? (
            <>
              <h2>📈 Leads Trend (Last 30 Days)</h2>
              <SkeletonCharts />
            </>
          ) : (
            <LeadsTrendChart data={stats.leads_trend} />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {!stats ? (
            <>
              <h2>📊 Monthly Stats</h2>
              <SkeletonCharts />
            </>
          ) : (
            <MonthlyLeadsChart data={stats.monthly_lead_summary} />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default StatsDashboard;
