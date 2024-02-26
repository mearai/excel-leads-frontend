import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';

import { styled } from '@mui/material/styles';
import Logo from '@/app/components/layout/logo/Logo';
import Navigations from './Navigations';


const LpHeader = () => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    justifyContent: 'center',
    [theme.breakpoints.up('lg')]: {
      minHeight: '80px',
    },
    backgroundColor: theme.palette.background.default,
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    paddingLeft: '0 !important',
    paddingRight: '0 !important',
    color: theme.palette.text.secondary,
  }));


  return (
    <AppBarStyled position="sticky" elevation={8}>
      <Container maxWidth="lg">
        <ToolbarStyled>
          <Logo />
          <Box flexGrow={1} />
            <Stack spacing={1} direction="row" alignItems="center">
              <Navigations />
            </Stack>
        </ToolbarStyled>
      </Container>
     
    </AppBarStyled>
  );
};

export default LpHeader;
