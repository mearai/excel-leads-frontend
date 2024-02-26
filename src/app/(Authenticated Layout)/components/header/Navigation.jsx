
import Button from '@mui/material/Button';

import Link from "next/link";



const Navigation = () => {
 

  return (
    <>
      
      <Button
        color="inherit"
        sx={{ color: (theme) => theme.palette.text.secondary }}
        variant="text"
        href="/leads"
        component={Link}
      >
        Leads
      </Button>
      
    </>
  );
};

export default Navigation;
