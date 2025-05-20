"use client";

import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "@/store/leads/LeadsSlice";
import { fetchCampaigns } from "@/store/campaigns/campaignsSlice";
import { useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const CampaignFilter = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.leads);
  const { campaigns, loading } = useSelector((state) => state.campaigns);

  // ✅ Fetch only if not already loaded
  useEffect(() => {
    if (campaigns.length === 0 && !loading) {
      dispatch(fetchCampaigns());
    }
  }, [dispatch, campaigns.length, loading]);

  const campaignOptions = [{ id: "all", name: "All Campaigns" }, ...campaigns];

  const handleChange = (e) => {
    const value = e.target.value === "all" ? "all" : parseInt(e.target.value);
    dispatch(setFilters({ campaign: value }));
  };

  return (
    <FormControl fullWidth size="small" sx={{ minWidth: 200 }}>
      <InputLabel id="campaign-filter-label">Campaign</InputLabel>
      <Select
        labelId="campaign-filter-label"
        value={filters.campaign}
        label="Campaign"
        onChange={handleChange}
      >
        {campaignOptions.map((c) => (
          <MenuItem key={c.id} value={c.id}>
            {c.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CampaignFilter;
