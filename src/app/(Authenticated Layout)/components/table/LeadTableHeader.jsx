"use client";
import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "@/store/leads/LeadsSlice";

const headCells = [
  { id: "id", label: "ID" },
  { id: "lead_from", label: "Lead From" },
  { id: "client_name", label: "Client Name" },
  { id: "created_at", label: "Date" },
];

const LeadTableHeader = () => {
  const dispatch = useDispatch();
  const { sort } = useSelector((state) => state.leads.filters);

  const handleSort = (field) => {
    const isAsc = sort.field === field && sort.direction === "asc";
    dispatch(
      setFilters({ sort: { field, direction: isAsc ? "desc" : "asc" } })
    );
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((head) => (
          <TableCell key={head.id}>
            <TableSortLabel
              active={sort.field === head.id}
              direction={sort.field === head.id ? sort.direction : "asc"}
              onClick={() => handleSort(head.id)}
            >
              {head.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default LeadTableHeader;
