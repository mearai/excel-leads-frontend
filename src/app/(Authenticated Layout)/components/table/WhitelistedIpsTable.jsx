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
  IconButton,
} from "@mui/material";
import ParentCard from "../shared/ParentCard";
import BlankCard from "../shared/BlankCard";
import { useEffect, useState } from "react";
import axios from "@/lib/axios"; // Assuming you are using axios for API calls
import { IconTrash } from "@tabler/icons-react";
import { addMessage } from "@/store/message/MessageSlice";
import { useDispatch } from "react-redux";
import Loading from "@/app/loading";
import { deleteIp } from "@/store/ip/ipSlice";
import { useGlobalDialog } from "@/context/DialogContext";

const WhitelistedIpsTable = ({ ips }) => {
  const dispatch = useDispatch();
  const { showDialog } = useGlobalDialog();
  // const [ips, setIps] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  if (ips.data.length == 0) {
    return <Loading />;
  }

  // Fetch IPs when the component mounts

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page
  };

  const handleDeleteIp = async (id) => {
    showDialog({
      type: "confirm",
      title: "Delete IP",
      description: "Are you sure you want to delete this IP?",
      icon: "warning",
      onConfirm: async () => {
        try {
          await dispatch(deleteIp(id));
          showDialog({
            type: "alert",
            title: "Success",
            description: "IP deleted successfully.",
            icon: "success",
          });
        } catch (error) {
          showDialog({
            type: "alert",
            title: "Error",
            description: "Failed to delete IP. Please try again.",
            icon: "error",
          });
        }
      },
      onCancel: () => {},
    });
  };

  return (
    <>
      <ParentCard title="Whitelisted IPs Data">
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
                    <Typography variant="h6">IP Address</Typography>
                  </TableCell>
                  <TableCell colSpan={1}>
                    <Typography variant="h6">Added On</Typography>
                  </TableCell>

                  <TableCell>
                    <Typography variant="h6">Actions</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? ips.data.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : whitelistedIps
                ).map((ip) => (
                  <TableRow key={ip.id}>
                    <TableCell>{ip.id}</TableCell>
                    <TableCell>{ip.ip_address}</TableCell>
                    <TableCell>
                      {new Date(ip.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteIp(ip.id)}
                      >
                        <IconTrash />
                      </IconButton>
                    </TableCell>
                  </TableRow>
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
                    count={ips.count}
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

export default WhitelistedIpsTable;
