"use client";
import { useTheme } from "@mui/material";
import dynamic from "next/dynamic";
import React from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
// import "./monthlyStyles.css";
const MonthlyLeadsChart = ({ data }) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  // Convert "Apr 2023" to a proper Date object like "2023-04-01"
  const parseMonth = (monthStr) => {
    const date = new Date(`${monthStr} 01`);
    return isNaN(date) ? null : date;
  };

  const formattedData = data
    .map((item) => ({
      x: item.month,
      y: Number(item.count ?? 0),
    }))
    .filter((item) => item.x); // filter out invalid dates

  const options = {
    chart: {
      type: "area",
      height: 300,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      foreColor: "#fff",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      type: "datetime",
      title: {
        text: "Month",
        style: { color: "#fff" },
      },
      labels: {
        format: "MMM yyyy",
      },
    },
    yaxis: {
      title: {
        text: "Leads",
        style: { color: "#fff" },
      },
      labels: {
        formatter: (val) => val.toFixed(0),
      },
    },
    tooltip: {
      shared: false,
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      x: {
        format: "MMM yyyy",
      },
      y: {
        formatter: (val) => val.toFixed(0),
      },
    },
    legend: {
      // labels: { colors: "#000" },
    },
  };

  const series = [
    {
      name: "Monthly Leads",
      data: formattedData,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      height={300}
      width="100%"
    />
  );
};

export default MonthlyLeadsChart;
