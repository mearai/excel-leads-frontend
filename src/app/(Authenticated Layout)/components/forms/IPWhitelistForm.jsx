"use client";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import ButtonWithLoading from "@/app/components/buttons/ButtonWithLoading";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "@/store/message/MessageSlice";
import { Grid } from "@mui/material";
import { createIp } from "@/store/ip/ipSlice";

const IPWhitelistForm = ({ title, subtitle, subtext }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (values) => {
    dispatch(createIp({ ip_address: values.ip }));
  };
  // Validation Schema for a single IP address
  const validationSchema = yup.object().shape({
    ip: yup
      .string()
      .matches(
        /^(\d{1,3}\.){3}\d{1,3}$/,
        "Invalid IP format (must be like 192.168.1.1)"
      )
      .required("IP address is required"),
  });

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      ip: "", // Single IP field
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);

      await onSubmit(values); // Send only a single IP object
      resetForm(); // Clear input after successful submission

      setLoading(false);
    },
  });

  return (
    <Grid container justifyContent={"center"} spacing={3} paddingTop={"40px"}>
      <Grid item xs={12} sm={8} p={4}>
        <form onSubmit={formik.handleSubmit}>
          {title && (
            <Typography fontWeight="700" variant="h3" mb={1}>
              {title}
            </Typography>
          )}

          {subtext}

          <Stack spacing={2}>
            <Box>
              <CustomFormLabel htmlFor="ip">IP Address</CustomFormLabel>
              <CustomTextField
                id="ip"
                name="ip"
                variant="outlined"
                fullWidth
                value={formik.values.ip}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.ip && Boolean(formik.errors.ip)}
                helperText={formik.touched.ip && formik.errors.ip}
              />
            </Box>

            <ButtonWithLoading
              sx={{ marginTop: "20px" }}
              text={"Whitelist IP"}
              loading={loading}
              type="submit" // Ensures form submits on click
            />
          </Stack>

          {subtitle}
        </form>
      </Grid>
    </Grid>
  );
};

export default IPWhitelistForm;
