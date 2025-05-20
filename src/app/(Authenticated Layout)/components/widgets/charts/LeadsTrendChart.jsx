"use client";
import { useTheme } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
const LeadsTrendChart = ({ data }) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  const options = {
    chart: {
      type: "line",
      foreColor: "#fff",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    grid: {
      show: false,
    },

    xaxis: {
      categories: data.map((item) => item.date ?? ""),
      type: "datetime",
      title: {
        text: "Last 30 Days",
        style: { color: "#fff" },
      },
      labels: {
        format: "dd-MMM",
      },
    },
    yaxis: { title: { text: "Leads" } },
    stroke: { curve: "smooth" },
    legend: { labels: { colors: "#fff" } },
    tooltip: { theme: theme.palette.mode === "dark" ? "dark" : "light" },
  };

  const series = [
    {
      name: "Leads ",
      data: data.map((item) => Number(item.count ?? 0)),
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="line"
      height={300}
      width="100%"
    />
  );
};

export default LeadsTrendChart;
