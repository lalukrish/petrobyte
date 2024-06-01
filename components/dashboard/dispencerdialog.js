"use client"

import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Autocomplete, Stack, TextField, Typography } from '@mui/material';
import { PetrobyteContext } from '@/context/context';

export default function DispencerDialog({close,data}) {



  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  

//   const handleClickOpen = () => {
//     setOpen(true);
//   };
const employees = [
    { label: "Abhi" },
    { label : "Aslam"},
];
  const handleClose = () => {
    close()
    
  };
  const handleSave = () => {

    console.log(name,phone,age,address,email)
    setRefreshEmployee(!refreshEmployee)
    
  };
  return (
    
      
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Today's Details:
        </DialogTitle>
        <DialogContent >
        <Stack spacing={2} sx={{width:"400px", padding:"5px"}}>
            <Typography>
            {data.name}
            </Typography>
            <Typography>
            {data.fuel}
            </Typography>
            <Autocomplete
  disablePortal
  id="combo-box-demo"
  options={employees}
  sx={{ width: 390 }}
  renderInput={(params) => <TextField {...params} label="Employee" />}
/>
<TextField autoFocus id="outlined-basic" label="Early Reading" variant="outlined" onChange={(event)=>{setName(event.target.value)}} />
 <TextField  id="outlined-basic" label="Late Reading" variant="outlined" onChange={(event)=>{setPhone(event.target.value)}} />

        
       
        </Stack>

        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    
  );
}
