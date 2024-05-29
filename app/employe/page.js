"use client"

import StaffNew from '@/components/employee/dialog';
import BasicTable from '@/components/employee/table'
import { Box, Button } from '@mui/material'
import React from 'react'


export default function page() {
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        height:'100vh',
        backgroundRepeat:"no-repeat",
        width: "100%",
        color: "white",
        textAlign: "center",
        padding: "10px",
      }}
    >
    
        <Button sx={{border:1,display:"flex",justifyContent:"flex-end"}} onClick={handleClickOpen}>
            Add New
        </Button>
        {
            open?<StaffNew close={handleClose}/>:null
        }
        

    
    
        <BasicTable></BasicTable>
    
    </Box>
  )
}
