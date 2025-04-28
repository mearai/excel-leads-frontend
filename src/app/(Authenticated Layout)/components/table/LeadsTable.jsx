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
} from "@mui/material";
import ParentCard from "../shared/ParentCard";
import BlankCard from "../shared/BlankCard";
import { useState } from "react";
import CustomTableRow from "./CustomTableRow";
import { useAuthContext } from "@/context/AuthContext";

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

  return (
    <>
      {/* breadcrumb */}
      {/* <Breadcrumb title="Collapsible Table" items={BCrumb} /> */}
      {/* end breadcrumb */}
      <ParentCard title="Leads Data">
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
                  <TableCell colSpan={1}>
                    <Typography variant="h6">ID</Typography>
                  </TableCell>

                  <TableCell colSpan={1}>
                    <Typography variant="h6">Lead From</Typography>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Typography variant="h6">Client Name</Typography>
                  </TableCell>

                  <TableCell colSpan={1}>
                    <Typography variant="h6">Date</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">Details</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? leads.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : leads
                ).map((lead) => (
                  <CustomTableRow key={lead.id} lead={lead} />
                ))}
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
