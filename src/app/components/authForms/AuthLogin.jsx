"use client";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { useAuth } from "@/hooks/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ButtonWithLoading from "../buttons/ButtonWithLoading";
import { addMessage } from "@/store/message/MessageSlice";

const AuthLogin = ({ title, subtitle, subtext }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
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
    if (errors.message) {
      dispatch(
        addMessage({
          type: "error",
          text: errors?.message,
        })
      );
    }
  }, [errors, dispatch]);

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
          {errors.code && (
            <>
              <Typography color="error" mt={2}>
                {errors.message}
              </Typography>
            </>
          )}
        </Stack>
        <ButtonWithLoading
          sx={{
            marginTop: "20px",
          }}
          text={"Sign In"}
          loading={loading}
        />
        {subtitle}
      </form>
    </Box>
  );
};

export default AuthLogin;
