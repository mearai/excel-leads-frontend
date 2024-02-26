import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';



const StyledButton = styled(Button)(() => ({
  padding: '13px 48px',
  fontSize: '16px',
}));

const BannerContent = () => {


  return (
    <Box mt={8}>
        <Typography
          variant="h1"
          fontWeight={900}
          sx={{
            fontSize: {
              md: '54px',
            },
            lineHeight: {
              md: '60px',
            },
          }}
        >
          Welcome to  {' '}
          <Typography component={'span'} variant="inherit" color={'primary'}>
            Flow Digital
          </Typography>{' '}
          Lead Management Dashobard
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={3}>
          <StyledButton variant="contained" color="primary" href="/login">
            Login
          </StyledButton>
        </Stack>
    </Box>
  );
};

export default BannerContent;
