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

export default function StaffNew({close}) {
const { refreshEmployee, setRefreshEmployee } = React.useContext(PetrobyteContext);
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [age, setAge] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [email, setEmail] = React.useState("");


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

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
          Add New
        </DialogTitle>
        <DialogContent >
        <Stack spacing={2} sx={{width:"400px", padding:"5px"}}>
        <TextField autoFocus id="outlined-basic" label="Name" variant="outlined" onChange={(event)=>{setName(event.target.value)}} />
        <TextField  id="outlined-basic" label="Phone" variant="outlined" onChange={(event)=>{setPhone(event.target.value)}} />
        <TextField id="outlined-basic" label="Age" variant="outlined" onChange={(event)=>{setAge(event.target.value)}} />
        <TextField id="outlined-basic" label="Address" variant="outlined" onChange={(event)=>{setAddress(event.target.value)}}/>
        <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(event)=>{setEmail(event.target.value)}}/>
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
