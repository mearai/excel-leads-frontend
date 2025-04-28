"use client";

import LeadsTable from "../components/table/LeadsTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "@/store/leads/LeadsSlice";
import { useEffect } from "react";
import Loading from "@/app/loading";
import { fetchSellers } from "@/store/seller/SellerSlice";

function Page() {
  const dispatch = useDispatch();
  const leads = useSelector((state) => state.leads);
  const sellers = useSelector((state) => state.sellers.data);
  const success = useSelector((state) => state.sellers.success);

  useEffect(() => {
    if (!success) {
      // Ensure the action runs only if data has not been fetched successfully
      dispatch(fetchSellers());
    }
  }, [dispatch, success]);

  useEffect(() => {
    if (leads.count === 0) {
      dispatch(fetchLeads());
    }
  }, [dispatch]);
  if (leads.success == false) {
    return <Loading />;
  }
  if (leads.success == true && leads.count === 0) {
    return <>No Leads assigned to you!</>;
  }

  return <LeadsTable leads={leads.data}></LeadsTable>;
}
export default Page;
