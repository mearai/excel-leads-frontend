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
  Button,
} from "@mui/material";
import ParentCard from "../shared/ParentCard";
import BlankCard from "../shared/BlankCard";
import { useEffect, useState } from "react";
import axios from "@/lib/axios"; // Custom axios instance
import { IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { createUser, deleteUser } from "@/store/users/UsersSlice";
import Loading from "@/app/loading";
import { useGlobalDialog } from "@/context/DialogContext";
import RegisterAgent from "../forms/RegisterForm";

const UsersTable = ({ users }) => {
  const dispatch = useDispatch();

  const { showDialog, closeDialog } = useGlobalDialog();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteUser = (id) => {
    // Dispatch Redux action to delete user
    showDialog({
      type: "confirm",
      title: "Delete User",
      description: "Are you sure you want to delete this User?",
      icon: "warning",
      onConfirm: async () => {
        try {
          await dispatch(deleteUser(id));
          showDialog({
            type: "alert",
            title: "Success",
            description: "User deleted successfully.",
            icon: "success",
          });
        } catch (error) {
          showDialog({
            type: "alert",
            title: "Error",
            description: "Failed to delete User. Please try again.",
            icon: "error",
          });
        }
      },
      onCancel: () => {},
    });
  };

  const handleAddAgent = async (values, resetForm) => {
    dispatch(createUser(values, resetForm, closeDialog())); // ✅ Using Thunk
  };
  const dialogContent = <RegisterAgent onSubmit={handleAddAgent} />;
  const handleAgentDialog = () => {
    showDialog({
      title: "Register New Agent!",
      description: dialogContent,
      onCancel: () => {}, // Add any callback for closing the dialog if needed
    });
  };

  return (
    <ParentCard title="Users List">
      <BlankCard>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAgentDialog}
          >
            Register New Agent
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">ID</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Email</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Role</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Actions</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? users.data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : users.data
              ).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteUser(user.id)}
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
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  count={users.count}
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
  );
};

export default UsersTable;
