import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { useTheme } from "@mui/material/styles";
import { Box, CardContent, Typography } from "@mui/material";
import BlankCard from "../../shared/BlankCard";
import { Stack } from "@mui/system";
import Loading from "@/app/loading";
import React from "react";
const Yaxis = (values) => {
  return values.map((value) => value.count);
};
const Xaxis = (values) => {
  return values.map((value) => value.date);
};
const Leads = ({ data }) => {
  const leadsData = Yaxis(data);
  const datesData = Xaxis(data);

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart
  const optionscolumnchart = {
    chart: {
      type: "bar",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 250,
      stacked: true,
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
    yaxis: {
      tickAmount: 4,
    },
    xaxis: {
      axisTicks: {
        show: false,
      },
      type: "category",
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
  console.log(data);
  return (
    <BlankCard>
      <CardContent sx={{ p: "30px" }}>
        <Box className="rounded-bars">
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="line"
            height="250px"
            width={"100%"}
          />
        </Box>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: "8px",
                height: "8px",
                backgroundColor: "primary.main",
                borderRadius: "100%",
              }}
            ></Box>
            <Typography variant="subtitle2" color="textSecondary">
              San Francisco
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: "8px",
                height: "8px",
                backgroundColor: "secondary.main",
                borderRadius: "100%",
              }}
            ></Box>
            <Typography variant="subtitle2" color="textSecondary">
              Diego
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </BlankCard>
  );
};

export default Leads;
