import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Stack, TextField } from '@mui/material';
import { PetrobyteContext } from '@/context/context';
import axios from 'axios';

export default function CreditNew({close}) {
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [credit, setCredit] = React.useState("");
  const [returnamount, setReturnamount] = React.useState("");
  const [balance, setBalance] = React.useState("");



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
          Add New Credit
        </DialogTitle>
        <DialogContent >
        <Stack spacing={2} sx={{width:"400px", padding:"5px"}}>
        <TextField autoFocus id="outlined-basic" placeholder="Name" variant="outlined" onChange={(event)=>{setName(event.target.value)}} />
        <TextField  id="outlined-basic" placeholder="Address" variant="outlined" onChange={(event)=>{setAddress(event.target.value)}} />
        <TextField id="outlined-basic" placeholder="Contact" variant="outlined" onChange={(event)=>{setContact(event.target.value)}} />
        <TextField id="outlined-basic" placeholder="Credit" variant="outlined" onChange={(event)=>{setCredit(event.target.value)}}/>
        <TextField id="outlined-basic" placeholder="Return" variant="outlined" onChange={(event)=>{setReturnamount(event.target.value)}}/>
        <TextField id="outlined-basic" placeholder="Balance" variant="outlined" onChange={(event)=>{setBalance(event.target.value)}}/>

        </Stack>

        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose}>
            Cancel
          </Button>
          <Button>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    
  );
}
