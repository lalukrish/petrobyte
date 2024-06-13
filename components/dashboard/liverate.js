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
   <Grid sx={{display:"flex",flexDirection:"row",gap:8,alignItems:"center"}}>  

   <Card sx={{
      width: "250px",
      height: "110px",
      backgroundColor: "white",
      boxShadow: 10,
      color: 'black',
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column',
     
      // padding: 2
    }}>
      {open ? <DashboardNew close={handleClose} /> : null}
      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2,display: 'flex', justifyContent: 'center' }}>
        Diesel
        </Typography>
        <Typography variant="h6" component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
          
          <span style={{ fontSize: "20px", fontWeight: 'bold' }}>102 Rs/Lts</span>
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleClickOpen}>
          <EditIcon />
        </Button>
      </CardActions>
    </Card>
    <Card sx={{
      width: "250px",
      height: "110px",
      backgroundColor: "white",
      boxShadow: 10,
      color: 'black',
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {open ? <DashboardNew close={handleClose} /> : null}
      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2,display: 'flex', justifyContent: 'center',mt:2 }}>
        Diesel
        </Typography>
        <Typography variant="h6" component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
          
          <span style={{ fontSize: "20px", fontWeight: 'bold' }}>102 Rs/Lts</span>
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleClickOpen}>
          <EditIcon />
        </Button>
      </CardActions>
    </Card>

    <Card sx={{
      width: "250px",
      height: "110px",
      backgroundColor: "white",
      boxShadow: 10,
      color: 'black',
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column',
     
      // padding: 2
    }}>
      {open ? <DashboardNew close={handleClose} /> : null}
      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2,display: 'flex', justifyContent: 'center',mt:2 }}>
        Diesel
        </Typography>
        <Typography variant="h6" component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
          
          <span style={{ fontSize: "20px", fontWeight: 'bold' }}>102 Rs/Lts</span>
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleClickOpen}>
          <EditIcon />
        </Button>
      </CardActions>
    </Card>
    <Card sx={{
      width: "250px",
      height: "110px",
      backgroundColor: "white",
      boxShadow: 10,
      color: 'black',
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column',
     
      // padding: 2
    }}>
      {open ? <DashboardNew close={handleClose} /> : null}
      <CardContent>
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 2,display: 'flex', justifyContent: 'center',mt:2 }}>
        Diesel
        </Typography>
        <Typography variant="h6" component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
          
          <span style={{ fontSize: "20px", fontWeight: 'bold' }}>102 Rs/Lts</span>
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleClickOpen}>
          <EditIcon />
        </Button>
      </CardActions>
    </Card>
</Grid>
</>
);
}
  

export default Liverate