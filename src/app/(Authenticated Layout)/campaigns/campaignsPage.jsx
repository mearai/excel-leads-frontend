"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCampaign,
  fetchCampaigns,
} from "@/store/campaigns/campaignsSlice";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import ParentCard from "../components/shared/ParentCard";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import Link from "next/link";

export default function CampaignsPage() {
  const dispatch = useDispatch();
  const { campaigns, loading } = useSelector((state) => state.campaigns);

  const [form, setForm] = useState({ name: "", domain: "" });

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.domain) return;
    dispatch(createCampaign(form));
    setForm({ name: "", domain: "" });
  };

  return (
    <ParentCard>
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Campaign Management
        </Typography>

        <Paper sx={{ p: 3, mb: 4 }} elevation={3}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <CustomTextField
                  fullWidth
                  label="Campaign Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <CustomTextField
                  fullWidth
                  label="Domain"
                  value={form.domain}
                  onChange={(e) => setForm({ ...form, domain: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                  sx={{ height: "100%" }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <Typography variant="h6" gutterBottom>
          All Campaigns
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : campaigns.length === 0 ? (
          <Typography>No campaigns found.</Typography>
        ) : (
          <Grid container spacing={2}>
            {campaigns.map((camp) => (
              <Grid item xs={12} md={6} key={camp.id}>
                <Link href={`/leads?campaign=${camp.id}`} passHref>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                      <strong>Campaign ID:</strong> {camp.id}
                    </Typography>
                    <Typography variant="h6">{camp.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {camp.domain}
                    </Typography>
                  </Paper>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </ParentCard>
  );
}
