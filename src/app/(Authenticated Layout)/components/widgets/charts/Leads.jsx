import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Box, CardContent, Typography } from "@mui/material";
import BlankCard from "../../shared/BlankCard";
import { Stack } from "@mui/system";
import Loading from "@/app/loading";
import React, { useEffect, useState } from "react";
import DashboardWidgetCard from "../../shared/DashboardWidgetCard";
import SkeletonCharts from "../skeletons/SkeletonCharts";
// const Yaxis = (values) => {
//   return values.map((value) => value.count);
// };
// const Xaxis = (values) => {
//   return values.map((value) => value.date);
// };
const Leads = ({ data }) => {
  // const leadsData = Yaxis(data);
  // const datesData = Xaxis(data);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart
  const optionscolumnchart = {
    chart: {
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      offsetX: 10,
      offsetY: 10,
      animations: {
        initialAnimation: {
          enabled: false,
        },
      },
    },
    colors: [primary, secondary],

    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    type: "area",
    animations: {
      initialAnimation: {
        enabled: false,
      },
    },
    xaxis: {
      // axisTicks: {
      //   show: false,
      // },
      type: "datetime",
    },

    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
  };
  const seriescolumnchart = [
    {
      name: "Leads",
      data: data,
    },
  ];

  return isLoading ? (
    <SkeletonCharts />
  ) : (
    <DashboardWidgetCard title="Last 15 Days Leads" subtitle="">
      <Box className="rounded-bars">
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="area"
          height="350px"
          width={"100%"}
        />
      </Box>
    </DashboardWidgetCard>
  );
};

export default Leads;
