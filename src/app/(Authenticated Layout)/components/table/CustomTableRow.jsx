"use client";
import {
  Badge,
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  IconChevronDown,
  IconChevronUp,
  IconEye,
  IconEyeOff,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import CustomTableInnerRow from "./CustomTableInnerRow";
import { useDispatch } from "react-redux";
import { deleteLead } from "@/store/leads/LeadsSlice";
import { useGlobalDialog } from "@/context/DialogContext";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function CustomTableRow({ lead }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { hasRole } = useAuthContext();
  const isAdmin = hasRole("admin");
  const { showDialog } = useGlobalDialog();
  if (!lead) {
    return;
  }

  const isHidden = lead.is_hidden;

  const rowColor = lead.is_hidden
    ? "#bd3235" // Red for hidden
    : lead.is_read
    ? "#388E3C" // Green for read
    : "#C79200"; // Yellow for unread
  // const rowColor = lead.is_hidden
  //   ? "rgba(189, 50, 53, 0.3)" // #bd3235 with 0.3 opacity
  //   : lead.is_read
  //   ? "rgba(56, 142, 60, 0.3)" // #388E3C with 0.3 opacity
  //   : "rgba(199, 146, 0, 0.3)"; // #C79200 with 0.3 opacity

  const handleDelete = async () => {
    showDialog({
      type: "confirm",
      title: "Delete Lead",
      description: "Are you sure you want to delete this lead?",
      icon: "warning",
      onConfirm: async () => {
        try {
          await dispatch(deleteLead(lead.id, isAdmin));
          showDialog({
            type: "alert",
            title: "Success",
            description: "Lead deleted successfully.",
            icon: "success",
          });
        } catch (error) {
          showDialog({
            type: "alert",
            title: "Error",
            description: "Failed to delete lead. Please try again.",
            icon: "error",
          });
        }
      },
      onCancel: () => {},
    });
  };
  const handleVisibilityModal = (is_hidden, hidden_by) => {
    if (!is_hidden) {
      return;
    }
    showDialog({
      type: "alert",
      title: "Lead Hidden By",
      description: (
        <TableContainer component={Paper} sx={{ maxWidth: 600, mt: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Hidden Date</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{hidden_by?.name}</TableCell>
                <TableCell>{hidden_by?.email}</TableCell>
                <TableCell>{hidden_by?.hidden_at}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ),
      icon: "info",
    });
  };
  return (
    <>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            backgroundColor: rowColor,
            userSelect: "none",
          },
        }}
      >
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            <Link
              href={`/leads/${lead.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {lead.id}
            </Link>
          </Typography>
        </TableCell>
        <TableCell colSpan={1}>
          <Link
            href={`/leads/${lead.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography variant="h6" fontWeight="600">
              {lead.lead_from}
            </Typography>
          </Link>
        </TableCell>
        <TableCell colSpan={1}>
          <Typography color="textSecondary" variant="h6">
            {lead.name}
          </Typography>
        </TableCell>

        <TableCell colSpan={1}>
          <Typography color="textSecondary" fontWeight="400">
            {lead.time_pkt}
          </Typography>
        </TableCell>
        <TableCell>
          <Box style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <Tooltip title={"Close Details "}>
                  <IconChevronUp />
                </Tooltip>
              ) : (
                <Tooltip title={"Open Details "}>
                  <IconChevronDown />
                </Tooltip>
              )}
            </IconButton>
            <IconButton
              aria-label="hide row"
              size="small"
              onClick={handleDelete}
            >
              <Tooltip title={"Hide Lead"}>
                <IconTrash />
              </Tooltip>
            </IconButton>
            {hasRole("admin") && (
              <Tooltip
                title={
                  lead.is_hidden ? "Hidden for sellers" : "Visible to sellers"
                }
              >
                <IconButton
                  aria-label="row visibility"
                  size="small"
                  onClick={() =>
                    handleVisibilityModal(lead.is_hidden, lead.hidden_by)
                  }
                >
                  {lead.is_hidden ? <IconEyeOff /> : <IconEye />}
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </TableCell>
      </TableRow>
      <CustomTableInnerRow
        time={lead.time_pkt}
        is_read={lead.is_read}
        open={open}
        id={lead.id}
        copied_by={lead.copied_by}
      />
    </>
  );
}
