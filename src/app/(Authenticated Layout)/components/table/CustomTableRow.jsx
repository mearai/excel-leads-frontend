"use client";
import {
  Badge,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";
import CustomTableInnerRow from "./CustomTableInnerRow";

export default function CustomTableRow({ lead }) {
  const [open, setOpen] = useState(false);
  if (!lead) {
    return;
  }
  const rowColor = lead.is_read ? "#035a16" : "#a72828"; // Light cyan if read, light red if not read

  return (
    <>
      <TableRow
        sx={{ "& > *": { borderBottom: "unset", backgroundColor: rowColor } }}
      >
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            {lead.id}
          </Typography>
        </TableCell>
        <TableCell colSpan={1}>
          <Typography variant="h6" fontWeight="600">
            {lead.lead_from}
          </Typography>
        </TableCell>
        <TableCell colSpan={1}>
          <Typography color="textSecondary" variant="h6">
            {lead.name}
          </Typography>
        </TableCell>

        <TableCell colSpan={1}>
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            {lead.created_at}
          </Typography>
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <IconChevronUp /> : <IconChevronDown />}
          </IconButton>
        </TableCell>
      </TableRow>
      <CustomTableInnerRow details={lead.details} open={open} id={lead.id} />
    </>
  );
}
