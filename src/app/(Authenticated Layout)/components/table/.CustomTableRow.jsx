"use client";
import {
  Badge,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { IconChevronDown, IconChevronUp, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import CustomTableInnerRow from "./CustomTableInnerRow";
import { useDispatch } from "react-redux";
import { deleteLead } from "@/store/leads/LeadsSlice";

export default function CustomTableRow({ lead }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  if (!lead) {
    return;
  }
  const rowColor = lead.is_read ? "#035a16" : "#a72828"; // Light cyan if read, light red if not read
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this lead?")) {
      try {
        await dispatch(deleteLead(lead.id));
        alert("Lead deleted successfully.");
      } catch (error) {
        console.error("Error deleting lead:", error);
        alert("Failed to delete lead. Please try again.");
      }
    }
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
            {lead.id}
          </Typography>
        </TableCell>
        <TableCell colSpan={1}>
          <Typography variant="h6" fontWeight="600">
            {lead.lead_data.lead_from}
          </Typography>
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
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <IconChevronUp /> : <IconChevronDown />}
            </IconButton>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={handleDelete}
            >
              <IconTrash />
            </IconButton>
          </div>
        </TableCell>
      </TableRow>
      <CustomTableInnerRow
        data_to_show={lead.details}
        data_to_copy={lead.lead_data}
        us_time={lead.time_chicago}
        is_read={lead.is_read}
        open={open}
        id={lead.id}
      />
    </>
  );
}
