"use client";

import PageContainer from "@/app/components/container/PageContainer";
import CollapsibleTable from "../components/table/CollapsibleTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "@/store/leads/LeadsSlice";
import { useEffect } from "react";
function page() {
  const dispatch = useDispatch();
  const leads = useSelector((state) => state.leads);
  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  return (
    <PageContainer title="Dashboard">
      <CollapsibleTable leads={leads.leads}></CollapsibleTable>
    </PageContainer>
  );
}
export default page;
