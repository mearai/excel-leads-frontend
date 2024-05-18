"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setGlobalError, setGlobalSuccess } from "@/store/message/MessageSlice";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";

const generateVerificationCodeValidation = () => {
  return yup
    .string()
    .matches(/^\d{0,1}$/, "Value must be a single digit between 0 and 9")
    .required("This field is required");
};

const validationSchema = yup.object({
  code1: generateVerificationCodeValidation(),
  code2: generateVerificationCodeValidation(),
  code3: generateVerificationCodeValidation(),
  code4: generateVerificationCodeValidation(),
  code5: generateVerificationCodeValidation(),
  code6: generateVerificationCodeValidation(),
});
const AuthTwoSteps = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState();
  const [status, setStatus] = useState(null);

  const { verifyCode, resendVerification, user } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/dashboard",
  });
  const dispatch = useDispatch();
  const inputRefs = useRef([]);
  const formik = useFormik({
    initialValues: {
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Concatenate all the values into a single string
      const mergedCode = Object.values(values).join("");
      verifyCode({ code: mergedCode, setErrors, setStatus, setLoading });
    },
  });

  const handleOnChange = (e, i) => {
    const { name, value } = e.target;
    let currentVal = value;

    // If the input value is more than one character, only take the last character
    if (currentVal.length > 1) {
      currentVal = value.slice(-1);
    }

    // Replace the current value with the new value
    const updatedValues = {
      ...formik.values,
      [name]: currentVal,
    };

    // Update the formik values
    formik.setValues(updatedValues);
    console.log(i);
    // Move the cursor to the next field if necessary
    if (i < 5) {
      inputRefs.current[i + 1].focus();
    }
  };

  const handleResend = (e, i) => {
    resendVerification({ setErrors, setStatus, setLoading, setMessage });
  };
  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("text");
    const pastedValues = pastedData.slice(0, 6).split("");

    // Update the formik values for each code field
    const updatedValues = {};
    for (let i = 0; i < 6; i++) {
      updatedValues[`code${i + 1}`] = pastedValues[i] || "";
    }
    formik.setValues(updatedValues);
  };
  useEffect(() => {
    if (errors) {
      console.log(errors);
      dispatch(setGlobalError(errors?.message));
    }
    if (message) {
      console.log(errors);
      dispatch(setGlobalSuccess(message));
    }
  }, [errors, message]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box mt={4}>
        <Stack mb={3}>
          <CustomFormLabel htmlFor="code">
            Type your 6 digits security code
          </CustomFormLabel>
          <Stack spacing={2} direction="row">
            {[...Array(6)].map((_, index) => (
              <CustomTextField
                key={index}
                fullWidth
                id={`code${index + 1}`}
                name={`code${index + 1}`}
                value={formik.values[`code${index + 1}`]}
                onChange={(e) => handleOnChange(e, index)}
                error={
                  formik.touched[`code${index + 1}`] &&
                  Boolean(formik.errors[`code${index + 1}`])
                }
                onPaste={handlePaste} // Add onPaste handler
                inputRef={(el) => (inputRefs.current[index] = el)}
                variant="outlined"
              />
            ))}
          </Stack>
          {formik.submitCount > 0 && Object.keys(formik.errors).length > 0 && (
            <Typography variant="body1" color="error">
              Invalid code format. *Only numeric values are accepted.
            </Typography>
          )}
        </Stack>
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          type="submit"
          disabled={loading}
        >
          Verify My Account
        </Button>

        <Stack direction="row" spacing={1} mt={3}>
          <Typography color="textSecondary" variant="h6" fontWeight="400">
            Didn&apos;t get the code?
          </Typography>
          <Typography
            // component={Link}
            // href="/"
            onClick={handleResend}
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Resend
          </Typography>
        </Stack>
      </Box>
    </form>
  );
};

export default AuthTwoSteps;
