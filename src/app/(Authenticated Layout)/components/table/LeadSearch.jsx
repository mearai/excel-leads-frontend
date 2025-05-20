"use client";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "@/store/leads/LeadsSlice";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";

const LeadSearch = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.leads);

  const handleChange = (e) => {
    dispatch(setFilters({ search: e.target.value }));
  };

  return (
    <CustomTextField
      id="search"
      label="Search by name or email"
      size="small"
      fullWidth
      value={filters.search}
      onChange={handleChange}
    />
  );
};

export default LeadSearch;
