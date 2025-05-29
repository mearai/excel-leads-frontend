"use client";

import LeadsTable from "../components/table/LeadsTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads, setFilters } from "@/store/leads/LeadsSlice";
import { useEffect } from "react";
import Loading from "@/app/loading";
import { Box, Container, Typography } from "@mui/material";
import withRole from "@/hoc/withRole";
import { useParams, useSearchParams } from "next/navigation";

function LeadsPage() {
  const searchParams = useSearchParams();
  const campaign = searchParams.get("campaign"); // Note: typo in 'campinag'?
  const dispatch = useDispatch();
  const { filteredLeads, count, success } = useSelector((state) => state.leads);

  useEffect(() => {
    if (count === 0) {
      dispatch(fetchLeads());
    }
  }, [dispatch, count]);
  console.log(campaign);
  useEffect(() => {
    if (campaign) {
      dispatch(setFilters({ campaign: parseInt(campaign.toString()) }));
    } else {
      dispatch(setFilters({ campaign: "all" }));
    }
  }, [campaign, dispatch]);
  if (success == false) {
    return <Loading />;
  }

  return <LeadsTable leads={filteredLeads}></LeadsTable>;
}
export default withRole(LeadsPage, "seller");
