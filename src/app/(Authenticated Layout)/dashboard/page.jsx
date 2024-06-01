"use client";

import CollapsibleTable from "../components/table/CollapsibleTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "@/store/leads/LeadsSlice";
import { useEffect } from "react";
import Loading from "@/app/loading";

function page() {
  const dispatch = useDispatch();
  const leads = useSelector((state) => state.leads);
  useEffect(() => {
    console.log(leads.leads.length);
    if (leads.leads.length === 0) {
      dispatch(fetchLeads());
    }
  }, [dispatch]);
  if (leads.leads.length === 0) {
    return <Loading />;
  }
  return <CollapsibleTable leads={leads.leads}></CollapsibleTable>;
}
export default page;
