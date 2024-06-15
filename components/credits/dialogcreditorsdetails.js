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

export default function CreditorsDetailsNew({close}) {
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [vnumber, setVnumber] = React.useState("");

  



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
        Add Creditor's Details
        </DialogTitle>
        <DialogContent >
        <Stack spacing={2} sx={{width:"400px", padding:"5px"}}>
        <TextField autoFocus id="outlined-basic" label="Name" variant="outlined" />
        <TextField id="outlined-basic" label="Address" variant="outlined" />
        <TextField id="outlined-basic" label="Contact" variant="outlined" />
        <TextField id="outlined-basic" label="Email" variant="outlined" />
        <TextField id="outlined-basic" label="Vehicle No" variant="outlined" />


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
