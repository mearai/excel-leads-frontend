"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useTheme } from "@mui/material/styles";
import { CardContent, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import BlankCard from "../../shared/BlankCard";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const LeadsOverTimeChart = ({ data }) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  // Prepare data: accumulated leads per month
  let total = 0;
  const cumulativeData = data.map((item) => {
    total += item.count;
    return {
      month: item.month, // e.g., "Jan 2024"
      totalLeads: total,
    };
  });

  const options = {
    chart: {
      type: "area",
      foreColor: "#adb0bb",
      sparkline: {
        enabled: true,
      },
      toolbar: { show: false },
      height: 90,
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
    },
    colors: [primary],
    stroke: {
      curve: "straight",
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: cumulativeData.map((d) => d.month),
      labels: {
        show: false,
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
      y: {
        formatter: (val) => `${val} leads`,
      },
    },
  };

  const series = [
    {
      name: "Cumulative Leads",
      data: cumulativeData.map((d) => d.totalLeads),
    },
  ];

  return (
    <BlankCard>
      <CardContent sx={{ p: "30px" }}>
        <Typography variant="h4">
          {cumulativeData.length > 0 ? cumulativeData.at(-1).totalLeads : 0}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Typography variant="subtitle2" color="textSecondary">
            Total Leads (2 years)
          </Typography>
          <Typography variant="subtitle2" color="success.main">
            📈
          </Typography>
        </Stack>
      </CardContent>
      <Chart
        options={options}
        series={series}
        type="area"
        height="90px"
        width="100%"
      />
    </BlankCard>
  );
};

export default LeadsOverTimeChart;
