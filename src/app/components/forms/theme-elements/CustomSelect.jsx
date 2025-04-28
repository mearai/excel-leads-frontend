import React from "react";
import { styled } from "@mui/material/styles";
import { Select } from "@mui/material";

const CustomSelect = styled((props) => <Select {...props} />)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    color: theme.palette.text.primary,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[400],
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
}));

export default CustomSelect;
