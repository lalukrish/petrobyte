import React from 'react';
const { Card, CardContent, CardActions, Typography, Button, Grid } = require("@mui/material");
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

    
    <>
   <Grid sx={{display:"flex",flexDirection:"row",gap:2,alignItems:"center"}}>  

<Card sx={{width:"270px",height:"120px",backgroundColor:"white",boxShadow:10,background: "#e3f2fd",
    color: 'black' }}>
{open?<DashboardNew close={handleClose}/>:null}
<CardContent>
<Typography variant="h5" component="div">
    Petrol:   Rs/Lts
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


<Card sx={{width:"270px",height:"120px",backgroundColor:"white",boxShadow:10 ,background: "#e3f2fd",
    color: 'black'}}>
{open?<DashboardNew close={handleClose}/>:null}
<CardContent>
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


<Card sx={{width:"270px",height:"120px",backgroundColor:"white",boxShadow:10,background: "#e3f2fd",
    color: 'black' }}>
{open?<DashboardNew close={handleClose}/>:null}
<CardContent>
<Typography variant="h5" component="div">
    Speed Petrol :   Rs/Lts
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


<Card sx={{width:"270px",height:"120px",backgroundColor:"white",boxShadow:10,background:"#e3f2fd",
    color: 'black' }}>
{open?<DashboardNew close={handleClose}/>:null}
<CardContent>
<Typography variant="h5" component="div">
    Oil:   Rs/Lts
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


</Grid>
</>
);
}
  

export default Liverate