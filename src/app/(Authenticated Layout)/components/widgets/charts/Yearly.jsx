import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";

import DashboardWidgetCard from "../../shared/DashboardWidgetCard";
import SkeletonCharts from "../skeletons/SkeletonCharts";
import { Box } from "@mui/material";

const YearlySales = ({ data }) => {
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
      type: "bar",
      fontFamily: theme.typography.fontFamily,
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 295,
    },
    colors: [primary, secondary],
    dataLabels: {
      enabled: true,

      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#adb0bb"],
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },

    legend: {
      show: false,
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      // position: "top",
      tooltip: {
        enabled: true,
      },
      axisTicks: {
        // show: false,
      },
      axisBorder: { show: false },
    },

    yaxis: {
      labels: {
        // show: false,
      },
      axisTicks: {
        show: true,
      },
      // axisBorder: {
      //   show: true,
      //   color: "#78909C",
      //   offsetX: 0,
      //   offsetY: 0,
      // },
    },
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
  };
  const seriescolumnchart = [
    {
      name: "Leads",
      // data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
      data: data,
    },
  ];

  return (
    <>
      {isLoading ? (
        <SkeletonCharts />
      ) : (
        <DashboardWidgetCard title="Last 12 Months Leads">
          <>
            <Box>
              <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height="350px"
                width={"100%"}
              />
            </Box>
          </>
        </DashboardWidgetCard>
      )}
    </>
  );
};

export default YearlySales;
