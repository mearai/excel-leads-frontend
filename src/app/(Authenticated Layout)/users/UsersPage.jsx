"use client";
import withRole from "@/hoc/withRole";
import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import UsersTable from "../components/table/UsersTable";
import { fetchUsers } from "@/store/users/UsersSlice";
import Loading from "@/app/loading";

const UsersPage = () => {
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

export default withRole(UsersPage, "admin");
