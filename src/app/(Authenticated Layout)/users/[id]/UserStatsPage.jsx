"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Divider,
} from "@mui/material";
import Link from "next/link";
import axios from "@/lib/axios";
import { useParams } from "next/navigation";
import ParentCard from "../../components/shared/ParentCard";
import BlankCard from "../../components/shared/BlankCard";
import Scrollbar from "../../components/custom-scroll/Scrollbar";

const UserStatsPage = () => {
  const { id } = useParams();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/v1/stats/user/${id}`) // Or full Laravel API URL if external
        .then((res) => {
          setStats(res.data); // Access data directly from res.data
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!stats) {
    return (
      <Typography variant="h6" color="error" align="center">
        Failed to load user stats.
      </Typography>
    );
  }

  return (
    <ParentCard title={`Stats for: ${stats.user.name}`} sx={{ mt: 2 }}>
      <Link href="/">
        <Typography variant="body1" color="primary">
          ← Back
        </Typography>
      </Link>

      <Typography variant="h4" gutterBottom>
        Stats for {stats.user.name}
      </Typography>

      <BlankCard sx={{ p: 4, mt: 2 }} elevation={3}>
        <CardContent>
          <Typography variant="h6">User Info</Typography>
          <Typography>Email: {stats.user.email}</Typography>
          <Typography>Last Login: {stats.last_login_at}</Typography>
          <Typography>
            Total Interactions: {stats.total_interactions}
          </Typography>
          <Typography>Last Interaction: {stats.last_interaction_at}</Typography>
        </CardContent>
      </BlankCard>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BlankCard sx={{ p: 4, mt: 2 }} elevation={3}>
            <CardContent>
              <Typography variant="h6">
                Copied Leads ({stats.copied_leads_count})
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Scrollbar sx={{ height: "385px" }}>
                {stats.copied_leads.map((lead, index) => (
                  <Typography key={index}>
                    Lead ID: {lead.lead_id} - Copied At: {lead.copied_at}
                  </Typography>
                ))}
              </Scrollbar>
            </CardContent>
          </BlankCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <BlankCard sx={{ p: 4, mt: 2 }} elevation={3}>
            <Scrollbar sx={{ height: "385px" }}>
              <CardContent>
                <Typography variant="h6">
                  Hidden Leads ({stats.hidden_leads_count})
                </Typography>
                <Divider sx={{ my: 1 }} />
                {stats.hidden_leads.map((lead, index) => (
                  <Typography key={index}>
                    Lead ID: {lead.lead_id} - Hidden At: {lead.hidden_at}
                  </Typography>
                ))}
              </CardContent>
            </Scrollbar>
          </BlankCard>
        </Grid>
      </Grid>
    </ParentCard>
  );
};

export default UserStatsPage;
