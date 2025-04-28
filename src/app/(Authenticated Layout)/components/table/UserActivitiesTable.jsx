"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  TextField,
  CircularProgress,
  TablePagination,
  Box,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import { fetchUserActivities } from "@/store/userActivities/userActivitiesSlice";
import Loading from "@/app/loading";

const columns = [
  { id: "id", label: "ID" },
  { id: "user_name", label: "User" },
  { id: "lead", label: "Lead" },
  { id: "ip_address", label: "IP" },
  { id: "activity_type", label: "Type" },
  { id: "created_at_pkt", label: "Created (PKT)" },
  { id: "created_at_chicago", label: "Created (CHI)" },
];
const activityTypes = [
  { label: "All", value: "" },
  { label: "Lead Copy", value: "lead_copy" },
  { label: "Login", value: "login" },
  { label: "Login Failed", value: "login_failed" },
  { label: "Lead Delete", value: "lead_delete" },
];
const UserActivitiesTable = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.userActivities);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  // Initial fetch
  useEffect(() => {
    dispatch(fetchUserActivities());
  }, [dispatch]);

  const handleSearch = useMemo(() => {
    return debounce((value) => {
      const filtered = list.filter((row) => {
        const matchesSearch = (
          row.id +
          " " +
          row.user_name +
          " " +
          row.lead?.name +
          " " +
          row.ip_address +
          " " +
          row.activity_type +
          " " +
          row.created_at_pkt +
          " " +
          row.created_at_chicago
        )
          .toLowerCase()
          .includes(value.toLowerCase());

        const matchesType = selectedType
          ? row.activity_type === selectedType
          : true;

        return matchesSearch && matchesType;
      });

      setFilteredList(filtered);
      setPage(0);
    }, 300);
  }, [list, selectedType]);

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);

    // Re-trigger search with the current input
    handleSearch(search); // assuming `search` is your current search input value
  };

  useEffect(() => {
    handleSearch(search);
    return () => handleSearch.cancel();
  }, [search, list, handleSearch]);

  // Sort filtered data
  const sortedData = useMemo(() => {
    const sorted = [...filteredList].sort((a, b) => {
      const aValue = a[sortBy] ?? "";
      const bValue = b[sortBy] ?? "";

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredList, sortBy, sortOrder]);

  // Paginated data
  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, page, rowsPerPage]);

  const handleSort = (column) => {
    const isAsc = sortBy === column && sortOrder === "asc";
    setSortBy(column);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Activity Type</InputLabel>
          <Select
            value={selectedType}
            label="Activity Type"
            onChange={handleTypeChange}
          >
            {activityTypes.map((type) => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.id}>
                  <TableSortLabel
                    active={sortBy === col.id}
                    direction={sortBy === col.id ? sortOrder : "desc"}
                    onClick={() => handleSort(col.id)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.user_name}</TableCell>
                  <TableCell>
                    {row.lead?.name ? `(${row.lead.id}) ${row.lead.name}` : "-"}
                  </TableCell>
                  <TableCell>{row.ip_address}</TableCell>
                  <TableCell>
                    {activityTypes.find(
                      (type) => type.value === row.activity_type
                    )?.label || "-"}
                  </TableCell>
                  <TableCell>{row.created_at_pkt}</TableCell>
                  <TableCell>{row.created_at_chicago}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  {loading ? <Loading /> : "No data found"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredList.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Paper>
  );
};

export default UserActivitiesTable;
