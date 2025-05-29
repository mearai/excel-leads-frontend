"use client";
import withRole from "@/hoc/withRole";
import React, { useEffect } from "react";
import axios from "@/lib/axios";
import IPWhitelistForm from "../components/forms/IPWhitelistForm";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/store/message/MessageSlice";
import WhitelistedIpsTable from "../components/table/WhitelistedIpsTable";
import { createIp, fetchIps } from "@/store/ip/ipSlice";

const IpSettings = () => {
  const dispatch = useDispatch();
  const ips = useSelector((state) => state.ips);
  const count = useSelector((state) => state.ips.count);
  useEffect(() => {
    if (count === 0) {
      dispatch(fetchIps());
    }
  }, [count, dispatch]);

  return (
    <Grid container justifyContent={"center"} spacing={3} paddingTop={"40px"}>
      {/* Whitelisted IPs Table should be displayed first */}
      <Grid item xs={12}>
        <WhitelistedIpsTable ips={ips} />
      </Grid>

      {/* IPWhitelistForm should be displayed below the table */}
      <Grid item xs={12}>
        <IPWhitelistForm title="Whitelist an IP" />
      </Grid>
    </Grid>
  );
};

export default withRole(IpSettings, "admin");
