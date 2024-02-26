import React, { useRef, useState } from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));

const TwoStepVerificationInput = ({ length = 6, ...props }) => {
  
  const inputRefs = useRef([]);

  const handleOnChange = (e, index) => {
    e.preventDefault();
    const { value } = e.target;
     // Only allow numeric characters
    const numericValue = value.replace(/\D/g, '');
    console.log('value' , value)
    console.log('numericValue' ,numericValue)
    // return if the typed character is not numeric
    if (value !== numericValue) {
        inputRefs.current[index].value = '';
      return
    }
console.log('return agay')
   
    // Replace the existing value with the new numeric value
    inputRefs.current[index].value = numericValue.slice(-1); // Keep only the last character
    // Move to the next field if the current field is not the last one
    if (index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
    
  };

  const handleOnPaste = (e) => {
    e.preventDefault(); // Prevent default paste behavior
    const pastedText = e.clipboardData.getData('text');
    // Autofill the input fields with pasted code
    for (let i = 0; i < Math.min(pastedText.length, length); i++) {
      inputRefs.current[i].value = pastedText[i];
      if (i < length - 1) {
        inputRefs.current[i + 1].focus();
      }
    }
  };

  return (
    <>
      {[...Array(length)].map((_, index) => (
        <StyledTextField
          key={index}
          inputRef={(el) => (inputRefs.current[index] = el)}
          onChange={(e) => handleOnChange(e, index)}
          onPaste={handleOnPaste}
          
          {...props}
        />
      ))}
    </>
  );
};

export default TwoStepVerificationInput;
