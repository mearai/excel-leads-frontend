import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Link from 'next/link';



const Navigations = () => {

    const StyledButton = styled(Button)(({ theme }) => ({
        fontSize: '16px',
        color: theme.palette.text.secondary
    }));

    return (
        <> 
            
            <Link href={'/login'}>
                <Button color="primary" variant="contained" >Login</Button>
            </Link>
            <Link href={'/logout'}>
                <Button color="primary" variant="contained" >Logout</Button>
            </Link>
            
        </>
    );
};

export default Navigations;
