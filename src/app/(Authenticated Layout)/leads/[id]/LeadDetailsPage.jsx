"use client";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { Box, Container, Typography, Paper, Grid } from "@mui/material";
import Loading from "@/app/loading";
import { useEffect } from "react";
import { fetchLeads } from "@/store/leads/LeadsSlice";
import withRole from "@/hoc/withRole";
import BlankCard from "../../components/shared/BlankCard";
import ParentCard from "../../components/shared/ParentCard";

function LeadDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const leads = useSelector((state) => state.leads);
  useEffect(() => {
    if (leads.count === 0) {
      dispatch(fetchLeads());
    }
  }, [dispatch]);
  if (leads.success === false) return <Loading />;

  const lead = leads.data?.find((l) => l.id === parseInt(id));
  console.log(lead);
  if (!lead) {
    return (
      <Container maxWidth="md">
        <Box textAlign="center" mt={10}>
          <Typography variant="h5" color="error">
            Lead not found
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    // <Container maxWidth="md" sx={{ mt: 4 }}>
    <ParentCard title={`Lead from: ${lead.lead_data.lead_from}`} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BlankCard elevation={3} sx={{ p: "30px" }}>
            <Typography variant="h3" gutterBottom mb={2}>
              Client Details
            </Typography>

            <Typography variant="body1" mb={1}>
              <strong>Lead ID:</strong> {lead.id}
            </Typography>
            <Typography variant="body1" mb={1}>
              <strong>Client Name:</strong> {lead.lead_data.name}
            </Typography>
            <Typography variant="body1" mb={1}>
              <strong>Client Email:</strong> {lead.lead_data.email || "N/A"}
            </Typography>
            <Typography variant="body1" mb={1}>
              <strong>Client Phone:</strong> {lead.lead_data.phone || "N/A"}
            </Typography>
            <Typography variant="body1" mb={1}>
              <strong>Client Message:</strong>{" "}
              {lead.lead_data.description || "N/A"}
            </Typography>
          </BlankCard>
          <BlankCard sx={{ p: 4, mt: 2 }} elevation={3}>
            <Typography variant="h3" gutterBottom mb={2}>
              Lead Details
            </Typography>

            {/* Extra Details */}
            {lead.details.extra_details.map((item, index) => {
              const key = Object.keys(item)[0];
              const value = item[key];
              const formattedKey = key
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase());

              return (
                <Typography key={index} variant="body1" mb={1}>
                  <strong>{formattedKey}:</strong> {value}
                </Typography>
              );
            })}
            <Typography variant="h3" gutterBottom mb={2}>
              Location
            </Typography>

            {/* Location Details */}
            {Object.entries(lead.details.location).map(
              ([key, value], index) => {
                const formattedKey = key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase());

                return (
                  <Typography key={`loc-${index}`} variant="body1" mb={1}>
                    <strong>{formattedKey}:</strong> {value}
                  </Typography>
                );
              }
            )}
          </BlankCard>
        </Grid>

        <Grid item xs={12} md={6}>
          {/* Is Read */}
          <BlankCard sx={{ p: 4 }} elevation={3}>
            <Typography variant="h6" gutterBottom mb={2}>
              Read Status
            </Typography>
            <Typography variant="body1">
              <strong>Is Read:</strong> {lead.is_read ? "Yes" : "No"}
            </Typography>
          </BlankCard>

          {/* Copied By */}
          {lead.copied_by?.length > 0 && (
            <BlankCard sx={{ p: 4, mt: 2 }} elevation={3}>
              <Typography variant="h6" gutterBottom mb={2}>
                Copied By
              </Typography>
              {lead.copied_by.map((entry, index) => (
                <Typography key={index} variant="body1" mb={1}>
                  <strong>User:</strong> {entry.user_name} <br />
                  <strong>Copied At:</strong> {entry.copied_at}
                </Typography>
              ))}
            </BlankCard>
          )}

          {/* Hidden By */}
          {lead.is_hidden && lead.hidden_by && (
            <BlankCard sx={{ p: 4, mt: 2 }} elevation={3}>
              <Typography variant="h6" gutterBottom mb={2}>
                Hidden Info
              </Typography>
              <Typography variant="body1" mb={1}>
                <strong>Name:</strong> {lead.hidden_by.name}
              </Typography>
              <Typography variant="body1" mb={1}>
                <strong>Email:</strong> {lead.hidden_by.email}
              </Typography>
              <Typography variant="body1" mb={1}>
                <strong>Hidden At:</strong> {lead.hidden_by.hidden_at}
              </Typography>
            </BlankCard>
          )}
        </Grid>
      </Grid>
    </ParentCard>

    // </Container>
  );
}
export default withRole(LeadDetailsPage, "admin");
