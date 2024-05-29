"use client";

import PageContainer from "@/app/components/container/PageContainer";
import CollapsibleTable from "../components/table/CollapsibleTable";
import { useDispatch, useSelector } from "react-redux";
import {
  addLeads,
  fetchLeads,
  fetchLeadsStats,
} from "@/store/leads/LeadsSlice";
import { useEffect, useState } from "react";
import Leads from "../components/widgets/charts/Leads";
import axios from "@/lib/axios";
import YearlySales from "../components/widgets/charts/Yearly";
import Pusher from "pusher-js";
import { setGlobalSuccess } from "@/store/message/MessageSlice";
function page() {
  const [leadsCount, setLeadsCount] = useState([]);
  const [stats, setStats] = useState([]);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const fetchStats = async () => {
    const stats = await fetchLeadsStats(); // Fetch leads stats
    setLeadsCount(stats); // Update leads count state
    setStats(stats); // Update leads count state
  };
  useEffect(() => {
    if (leadsCount.length >= 0) {
      console.log("asd");
      fetchStats(); // Call the fetchStats function
    }
  }, []);

  return (
    <PageContainer title="Dashboard">
      <Leads leadscount={leadsCount} data={stats} />
      <YearlySales data={stats} />
    </PageContainer>
  );
}
export default page;
