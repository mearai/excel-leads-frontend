"use client";
import { useFormik } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import ButtonWithLoading from "@/app/components/buttons/ButtonWithLoading";
import { useState } from "react";
import CustomSelect from "@/app/components/forms/theme-elements/CustomSelect";
import { FormControl, MenuItem } from "@mui/material";

const RegisterAgent = ({ title, onSubmit }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values, resetForm) => {
    dispatch(createUser(values, resetForm)); // ✅ Using Thunk
  };
  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    role: yup
      .string()
      .oneOf(["admin", "seller"], "Invalid role")
      .required("Role is required"),
  });

  // Formik Configuration
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "seller",
    },
    validationSchema: validationSchema,

    onSubmit: async (values, { resetForm }) => {
      setLoading(true);

      await onSubmit(values, resetForm);

      setLoading(false);
    },
  });
  return (
    <Box p={4} width="100%">
      <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
        {title && (
          <Typography fontWeight="700" variant="h3" mb={2}>
            {title}
          </Typography>
        )}

        <Stack spacing={2}>
          {/* Name Field */}
          <CustomTextField
            id="name"
            label="Full Name"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          {/* Email Field */}
          <CustomTextField
            id="email"
            label="Email"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          {/* Password Field */}
          <CustomTextField
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            autoComplete={"new-password"}
          />

          {/* Confirm Password Field */}
          <CustomTextField
            id="password_confirmation"
            label="Confirm Password"
            type="password"
            fullWidth
            value={formik.values.password_confirmation}
            onChange={formik.handleChange}
            error={
              formik.touched.password_confirmation &&
              Boolean(formik.errors.password_confirmation)
            }
            helperText={
              formik.touched.password_confirmation &&
              formik.errors.password_confirmation
            }
            autoComplete={"new-password"}
          />

          {/* Role Selection */}
          <FormControl fullWidth>
            {/* <InputLabel id="role-label">Select Role</InputLabel> */}
            <CustomSelect
              id="role"
              labelId="role-label"
              value={formik.values.role}
              onChange={(event) =>
                formik.setFieldValue("role", event.target.value)
              } // Fix onChange
              error={formik.touched.role && Boolean(formik.errors.role)}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="seller">Seller</MenuItem>
            </CustomSelect>
          </FormControl>

          {/* Submit Button */}
          <ButtonWithLoading
            sx={{ marginTop: "20px", width: "100%" }}
            text={"Register Agent"}
            loading={loading}
          />
        </Stack>
      </form>
    </Box>
  );
};

export default RegisterAgent;
