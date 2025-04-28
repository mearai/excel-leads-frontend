"use client";
import withRole from "@/hoc/withRole";
import React, { useEffect } from "react";
import { Grid } from "@mui/material";

import RegisterAgent from "../components/forms/RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/store/message/MessageSlice";
import UsersTable from "../components/table/UsersTable";
import { createUser, fetchUsers } from "@/store/users/UsersSlice";
import Loading from "@/app/loading";
import { useGlobalDialog } from "@/context/DialogContext";

const Page = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    if (users.count === 0) {
      dispatch(fetchUsers());
    }
  }, [users.count, dispatch]);

  if (users.success == false) {
    return <Loading />;
  }
  return (
    <Grid container justifyContent={"center"} spacing={3} paddingTop={"40px"}>
      {/* <Grid item xs={12}>
        
      </Grid> */}
      <Grid item xs={12}>
        <UsersTable users={users} />
      </Grid>
    </Grid>
  );
};

export default withRole(Page, "admin");
