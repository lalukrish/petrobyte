import React from 'react';
const { Card, CardContent, CardActions, Typography, Button } = require("@mui/material");
import EditIcon from '@mui/icons-material/Edit';
import DashboardNew from './dialogadd';


function Liverate() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
     
    



<Card sx={{width:"850px",height:"150px",backgroundColor:"white",boxShadow:10 }}>
{open?<DashboardNew close={handleClose}/>:null}
<CardContent>
<Typography variant="h5" component="div">
    Petrol:   Rs/Lts
  </Typography>
  <Typography variant="h5" component="div">
    Diesel:   Rs/Lts
  </Typography>
  <Typography sx={{ mb: 1.5 }} color="text.secondary">
    
  </Typography>
  <Typography variant="body2">
    
    
  </Typography>
</CardContent>
<CardActions>
  <Button onClick={handleClickOpen} ><EditIcon/></Button>
</CardActions>
</Card>
);
}
  

export default Liverate