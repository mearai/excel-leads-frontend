"use client";

import LeadsTable from "./components/table/LeadsTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "@/store/leads/LeadsSlice";
import { useEffect } from "react";
import Loading from "@/app/loading";
import { Box, Container, Typography } from "@mui/material";

function Page() {
  const dispatch = useDispatch();
  const leads = useSelector((state) => state.leads);

  useEffect(() => {
    if (leads.count === 0) {
      dispatch(fetchLeads());
    }
  }, [dispatch]);
  if (leads.success == false) {
    return <Loading />;
  }
  if (leads.count === 0) {
    return (
      <Container
        sx={{
          maxWidth: "lg",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          height="100vh"
          textAlign="center"
          justifyContent="center"
        >
          <Typography align="center" variant="h4" mb={4}>
            No Leads assigned to you!
          </Typography>
        </Box>
      </Container>
    );
  }

  return <LeadsTable leads={leads.data}></LeadsTable>;
}
export default Page;
