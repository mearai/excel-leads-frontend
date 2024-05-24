"use client";

import PageContainer from "@/app/components/container/PageContainer";
import CollapsibleTable from "./components/table/CollapsibleTable";
import { useDispatch, useSelector } from "react-redux";
import {
  addLeads,
  fetchLeads,
  fetchLeadsStats,
} from "@/store/leads/LeadsSlice";
import { useEffect, useState } from "react";
import Leads from "./components/widgets/charts/Leads";
import axios from "@/lib/axios";
import YearlySales from "./components/widgets/charts/Yearly";
import Pusher from "pusher-js";
import { setGlobalSuccess } from "@/store/message/MessageSlice";
function page() {
  const [leadsCount, setLeadsCount] = useState([]);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const leads = useSelector((state) => state.leads);
  useEffect(() => {
    //  const fetchStats = async () => {
    //   const stats = await fetchLeadsStats(); // Fetch leads stats
    //   setLeadsCount(stats); // Update leads count state
    // };
    // fetchStats(); // Call the fetchStats function

    dispatch(fetchLeads());
  }, [dispatch]);

  useEffect(() => {
    // Fetch initial leads from the server
    // Initialize Pusher
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
    });

    // Subscribe to the 'leads' channel
    const channel = pusher.subscribe("leads");

    // Bind to the 'LeadCreated' event
    channel.bind("lead-created", function (message) {
      if (message) {
        console.log("message");
        console.log(message.lead);
        dispatch(addLeads(message.lead));
        playNotificationSound();
        // dispatch(setGlobalSuccess(message.lead));
      }
    });

    // Cleanup on component unmount
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  const playNotificationSound = () => {
    const audio = new Audio("/correct.mp3");
    audio.play();
  };
  return (
    <PageContainer title="Dashboard">
      <CollapsibleTable leads={leads.leads}></CollapsibleTable>
      {/* <Leads leadscount={leadsCount}/>
      <YearlySales/> */}
    </PageContainer>
  );
}
export default page;
