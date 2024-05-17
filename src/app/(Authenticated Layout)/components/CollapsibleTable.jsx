"use client";

import * as React from "react";
import {
  Typography,
  Box,
  Chip,
  Paper,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Stack,
} from "@mui/material";
import ParentCard from "./shared/ParentCard";
import BlankCard from "./shared/BlankCard";

// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconChevronDown } from "@tabler/icons-react";
import { IconChevronUp } from "@tabler/icons-react";

function createData(imgsrc, pname, customer, inventory, price, items) {
  return {
    imgsrc,
    pname,
    customer,
    inventory,
    price,
    items,
    history: [
      { date: "2021-02-05", customerId: "15202410", price: 250, amount: 3 },
      { date: "2021-02-02", customerId: "Anonymous", price: 600, amount: 1 },
    ],
  };
}
const formatKey = (key) => {
  return key
    .replace(/[_-]/g, " ") // Replace underscores and dashes with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};
function Row(props) {
  const { lead } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <IconChevronUp /> : <IconChevronDown />}
          </IconButton>
        </TableCell>
        <TableCell colSpan={1}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h6" fontWeight="600">
              {lead.lead_from}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell colSpan={1}>
          <Typography color="textSecondary" variant="h6">
            {lead.name}
          </Typography>
        </TableCell>
        <TableCell colSpan={1}>
          <Typography variant="h6" fontWeight="600">
            {lead.email}
          </Typography>
          {/* <Chip
            size="small"
            label={row.inventory ? "In Stock" : "Out of Stock"}
            color={row.inventory ? "success" : "error"}
            sx={{ borderRadius: "6px" }}
          /> */}
        </TableCell>
        <TableCell colSpan={1}>
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            {lead.phone}
          </Typography>
        </TableCell>
        <TableCell colSpan={1}>
          <Typography color="textSecondary" fontWeight="400">
            {lead.created_at_date} {lead.created_at_time}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                gutterBottom
                variant="h5"
                sx={{
                  mt: 2,
                  backgroundColor: (theme) => theme.palette.grey.A200,
                  p: "5px 15px",
                  color: (theme) =>
                    `${
                      theme.palette.mode === "dark"
                        ? theme.palette.grey.A200
                        : "rgba(0, 0, 0, 0.87)"
                    }`,
                }}
              >
                Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {Object.entries(lead.details).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>
                        <Typography color="textSecondary" fontWeight="400">
                          {formatKey(key)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" fontWeight="400">
                          {Array.isArray(value)
                            ? value.join(", ")
                            : typeof value === "object"
                            ? JSON.stringify(value)
                            : value}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Collapsible Table",
  },
];

const CollapsibleTable = ({ leads }) => {
  console.log(leads);
  const rows = [
    createData(
      "/images/products/s1.jpg",
      "Good butterscotch ice-cream",
      "Sunil Joshi",
      true,
      250,
      "2"
    ),
    createData(
      "/images/products/s2.jpg",
      "Supreme fresh tomato available",
      "John Deo",
      false,
      450,
      "1"
    ),
    createData(
      "/images/products/s3.jpg",
      "Red color candy from Gucci",
      "Andrew McDownland",
      false,
      150,
      "2"
    ),
    createData(
      "/images/products/s4.jpg",
      "Stylish night lamp for night",
      "Christopher Jamil",
      true,
      550,
      "6"
    ),
  ];
  return (
    <>
      {/* breadcrumb */}
      {/* <Breadcrumb title="Collapsible Table" items={BCrumb} /> */}
      {/* end breadcrumb */}
      <ParentCard title="Collapsible">
        <BlankCard>
          <TableContainer component={Paper}>
            <Table
              aria-label="collapsible table"
              sx={{
                whiteSpace: {
                  xs: "nowrap",
                  sm: "unset",
                },
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell colSpan={1}>
                    <Typography variant="h6">Lead From</Typography>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Typography variant="h6">Client Name</Typography>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Typography variant="h6">Client Email</Typography>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Typography variant="h6">Client Phone</Typography>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Typography variant="h6">Date</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leads.leads.map((lead) => (
                  <Row key={lead.id} lead={lead} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </BlankCard>
      </ParentCard>
    </>
  );
};

export default CollapsibleTable;
