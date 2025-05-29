"use client";
import React, { useRef } from "react";
import {
  Box,
  Button,
  Collapse,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { formatData } from "./leadsHelper/helper";
import { useDispatch } from "react-redux";

import { markLeadAsRead } from "@/store/leads/LeadsSlice";
import { useAuthContext } from "@/context/AuthContext";

import { IconCopy } from "@tabler/icons-react";
import { useGlobalDialog } from "@/context/DialogContext";

const CustomTableInnerRow = ({ open, id, time, is_read, copied_by }) => {
  const { showDialog, closeDialog } = useGlobalDialog();
  const buttonRef = useRef(null);
  const dispatch = useDispatch();
  const { hasRole } = useAuthContext();

  const handleShowCopiedUsers = () => {
    const copiedUsers = copied_by.map((activity) => ({
      user_name: activity.user_name,
      copied_at: activity.copied_at,
    }));

    const dialogContent = (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Copied At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {copiedUsers.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.user_name}</TableCell>
                <TableCell>{user.copied_at}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );

    showDialog({
      title: "Users Who Copied This Lead",
      description: dialogContent,
      onClose: closeDialog(), // Add any callback for closing the dialog if needed
    });
  };
  // Check permission
  const isAdmin = hasRole("admin");
  const handleCopy = async () => {
    try {
      // Get the full lead object
      const fullLead = await dispatch(markLeadAsRead(id));
      await navigator.clipboard.writeText(formatData(fullLead.lead_data));

      console.log("Lead copied to clipboard!");
    } catch (error) {
      console.error("Failed to mark as read or copy:", error);
    }
  };

  return (
    <>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                gutterBottom
                variant="h5"
                sx={{
                  mt: 2,
                  backgroundColor: (theme) =>
                    `${
                      theme.palette.mode === "dark"
                        ? theme.palette.bg.dark
                        : theme.palette.bg.light
                    }`,
                  p: "5px 15px",
                  color: (theme) =>
                    `${
                      theme.palette.mode === "dark"
                        ? theme.palette.text.light
                        : "rgba(0, 0, 0, 0.87)"
                    }`,
                }}
                textAlign={"center"}
              >
                <Stack>
                  <Typography
                    variant="h3"
                    marginTop={"10px"}
                    marginBottom={"10px"}
                  >
                    Lead No. {id}
                  </Typography>
                  <Typography color="textSecondary" fontWeight="400">
                    {time}
                  </Typography>
                </Stack>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent={"center"}
                  alignItems={"center"}
                  marginTop={"10px"}
                >
                  <Button
                    sx={{
                      padding: "13px 48px",
                      fontSize: "16px",
                    }}
                    direction="row"
                    spacing={2}
                    variant="contained"
                    color="success"
                    ref={buttonRef}
                    onClick={handleCopy}
                  >
                    <IconCopy />
                    Copy Lead
                  </Button>

                  {is_read && isAdmin && (
                    <Button
                      sx={{
                        padding: "13px 48px",
                        fontSize: "16px",
                      }}
                      spacing={2}
                      variant="contained"
                      color="primary"
                      onClick={handleShowCopiedUsers}
                    >
                      Who Copied This Lead?
                    </Button>
                  )}
                </Stack>
                <Stack>{/* <ThemeDialog /> */}</Stack>
              </Typography>
              <Table
                size="small"
                aria-label="data_to_show"
                style={{ filter: "blur(5px)", userSelect: "none" }}
              >
                <TableBody>
                  {/* {renderTableRows(data_to_copy)}
                  {renderTableRows(data_to_show)} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CustomTableInnerRow;
