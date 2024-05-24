"use client";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setGlobalError } from "@/store/message/MessageSlice";

const AuthLogin = ({ title, subtitle, subtext }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });

  // Define validation schema using Yup
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false, // Remember Me field added
    },
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      login({
        email: values.email, // Changed to email
        password: values.password,
        rememberMe: values.rememberMe, // Remember Me value
        setLoading,
        setErrors,
        setStatus,
      });
      // Redirect or show success message if login is successful
    },
  });
  useEffect(() => {
    if (errors) {
      console.log(errors);
      dispatch(setGlobalError(errors?.message));
    }
  }, [errors]);

  return (
    <Box p={4}>
      <form onSubmit={formik.handleSubmit}>
        {title ? (
          <Typography fontWeight="700" variant="h3" mb={1}>
            {title}
          </Typography>
        ) : null}

        {subtext}
        <Stack>
          <Box>
            <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
            <CustomTextField
              id="email"
              variant="outlined"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
          <Box>
            <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <Typography
              component={Link}
              href="/auth/auth1/forgot-password"
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Forgot Password ?
            </Typography>
          </Stack>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={loading}
          >
            Sign In
          </Button>
        </Box>
        {subtitle}
      </form>
    </Box>
  );
};

export default AuthLogin;
