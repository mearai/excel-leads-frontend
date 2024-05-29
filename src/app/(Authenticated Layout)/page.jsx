"use client";

import PageContainer from "@/app/components/container/PageContainer";
import CollapsibleTable from "./components/table/CollapsibleTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "@/store/leads/LeadsSlice";
import { useEffect } from "react";
import Loading from "../loading";

function page() {
  const dispatch = useDispatch();
  const leads = useSelector((state) => state.leads);
  useEffect(() => {
    console.log(leads.leads.length);
    if (leads.leads.length === 0) {
      console.log("leads");
      console.log(leads.leads);
      dispatch(fetchLeads());
    }
  }, [dispatch]);
  if (leads.leads.length === 0) {
    return <Loading />;
  }
  return (
    // <PageContainer title="Dashboard" description="Flow digital">
    <>
      <CollapsibleTable leads={leads.leads}></CollapsibleTable>
      {/* <Leads leadscount={leadsCount}/>
      
      <YearlySales/> */}
    </>
    // </PageContainer>
  );
}
export default page;
