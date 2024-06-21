import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { PetrobyteContext } from '@/context/context';
import axios from 'axios';

export default function TestNew({close}) {
  const [dispencer, setDispencer] = React.useState("");
  const [fuel, setFuel] = React.useState("");
  const [qty, setQty] = React.useState("");
  



  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    close()
    
  };
  
  return (
    
      
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Test Details
        </DialogTitle>
        <DialogContent >
        <Stack spacing={2} sx={{width:"400px", padding:"5px"}}>
        {/* <TextField autoFocus id="outlined-basic" label="Dispencer" variant="outlined" onChange={(event)=>{setDispencer(event.target.value)}} /> */}
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Dispencer</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dispencer}
              label="Fuel"
              
            >
              
                <MenuItem>
                  D1
                </MenuItem>
              
            </Select>
          </FormControl>
       
        {/* <TextField  id="outlined-basic" label="Fuel" variant="outlined" onChange={(event)=>{setFuel(event.target.value)}} /> */}

        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Fuel</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fuel}
              label="Fuel"
              
            >
              
                <MenuItem>
                  Petrol
                </MenuItem>
              
            </Select>
          </FormControl>
        <TextField id="outlined-basic" label="Qty" variant="outlined" onChange={(event)=>{setQty(event.target.value)}} />

        </Stack>

        </DialogContent>
        <DialogActions>
          <Button color='error'  onClick={handleClose}>
            Cancel
          </Button>
          <Button color='success'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    
  );
}
