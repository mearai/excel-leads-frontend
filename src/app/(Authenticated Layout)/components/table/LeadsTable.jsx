"use client";

import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableFooter,
  Box,
  Stack,
  Chip,
  Grid,
  Container,
} from "@mui/material";
import ParentCard from "../shared/ParentCard";
import BlankCard from "../shared/BlankCard";
import { useState } from "react";
import CustomTableRow from "./CustomTableRow";
import { useAuthContext } from "@/context/AuthContext";

import CampaignFilter from "./LeadFilter";
import LeadSearch from "./LeadSearch";
import LeadTableHeader from "./LeadTableHeader";

const LeadsTable = ({ leads }) => {
  const { hasRole } = useAuthContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };
  if (!hasRole("seller")) {
    return (
      <>
        <BlankCard>
          <Box>
            <h2>You dont have permission to view this </h2>
          </Box>
        </BlankCard>
      </>
    );
  }
  // if (leads.length === 0) {
  //   return (
  //     <Container
  //       sx={{
  //         maxWidth: "lg",
  //       }}
  //     >
  //       <Box
  //         display="flex"
  //         flexDirection="column"
  //         height="100vh"
  //         textAlign="center"
  //         justifyContent="center"
  //       >
  //         <Typography align="center" variant="h4" mb={4}>
  //           No leads found
  //         </Typography>
  //       </Box>
  //     </Container>
  //   );
  // }
  return (
    <>
      <BlankCard sx={{ my: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Row Color Legend
        </Typography>

        <Stack direction="row" spacing={2}>
          <Chip
            label="Read"
            sx={{
              backgroundColor: "#bd3235",
              color: "#fff",
              fontWeight: 600,
            }}
          />
          <Chip
            label="Hidden"
            sx={{
              backgroundColor: "#388E3C",
              color: "#fff",
              fontWeight: 600,
            }}
          />
          <Chip
            label="New"
            sx={{
              backgroundColor: "#C79200",
              color: "#fff",
              fontWeight: 600,
            }}
          />
        </Stack>
      </BlankCard>
      {/* breadcrumb */}
      {/* <Breadcrumb title="Collapsible Table" items={BCrumb} /> */}
      {/* end breadcrumb */}
      <ParentCard title="Leads Data" sx={{ mt: 2 }}>
        <BlankCard>
          <Grid container spacing={2} sx={{ mb: 2, p: 2 }}>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Typography
                variant="subtitle2"
                textAlign={`center`}
                color="text.secondary"
              >
                {leads.length} lead{leads.length !== 1 ? "s" : ""} found
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{ mt: 2 }}>
              <LeadSearch />
            </Grid>
            <Grid item xs={12} md={6} sx={{ mt: 2 }}>
              <CampaignFilter />
            </Grid>
          </Grid>
        </BlankCard>
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
              <LeadTableHeader />
              <TableBody>
                {leads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={100} align="center">
                      No leads found
                    </TableCell>
                  </TableRow>
                ) : (
                  (rowsPerPage > 0
                    ? leads.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : leads
                  ).map((lead) => <CustomTableRow key={lead.id} lead={lead} />)
                )}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    count={leads.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </BlankCard>
      </ParentCard>
    </>
  );
};

export default LeadsTable;
