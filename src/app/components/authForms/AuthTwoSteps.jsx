"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { Stack } from "@mui/system";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "@/store/message/MessageSlice";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth";
import ButtonWithLoading from "../buttons/ButtonWithLoading";
import { Card } from "@mui/material";
import Logo from "../layout/logo/Logo";
import Loading from "@/app/loading";

const codeValidation = () => {
  return yup
    .string()
    .matches(/^\d{0,1}$/, "Value must be a single digit between 0 and 9")
    .required("This field is required");
};

const validationSchema = yup.object({
  code1: codeValidation(),
  code2: codeValidation(),
  code3: codeValidation(),
  code4: codeValidation(),
  code5: codeValidation(),
  code6: codeValidation(),
});
const AuthTwoSteps = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState();
  const [status, setStatus] = useState(null);
  const email = useSelector((state) => state.auth.currentUserEmail);

  const { verifyCode, resendVerification, user } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
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
      verifyCode({
        two_factor_code: mergedCode,
        setErrors,
        setStatus,
        setLoading,
      });
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
    if (message) {
      dispatch(
        addMessage({
          type: "success",
          text: message,
        })
      );
    }
  }, [errors, message, dispatch]);
  if (!email) {
    console.log(email);
    return <Loading />;
  }
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

  return (
    <Card
      elevation={9}
      sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "450px" }}
    >
      <Box display="flex" alignItems="center" justifyContent="center">
        <Logo />
      </Box>
      <Typography
        variant="subtitle1"
        textAlign="center"
        color="textSecondary"
        mb={1}
      >
        We sent a verification code to your email. Enter the code from the email
        in the field below.
      </Typography>
      <Typography
        variant="subtitle1"
        textAlign="center"
        fontWeight="700"
        mb={1}
      >
        {email}
      </Typography>
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
            {formik.submitCount > 0 &&
              Object.keys(formik.errors).length > 0 && (
                <Typography variant="body1" color="error">
                  Invalid code format. *Only numeric values are accepted.
                </Typography>
              )}
          </Stack>

          <ButtonWithLoading text={"Verify My Account"} loading={loading} />

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
    </Card>
  );
};

export default AuthTwoSteps;
