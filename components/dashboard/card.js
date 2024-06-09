import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DispencerDialog from './dispencerdialog';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SpeedIcon from '@mui/icons-material/Speed';
import Person4Icon from '@mui/icons-material/Person4';





export default function BasicCard({data}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Card sx={{width:"200px",backgroundColor:"white" ,boxShadow:10 ,gap:20,background: 'linear-gradient(to bottom, #b2dfdb, #004d40)',
      color: 'black'}}  >
{open?<DispencerDialog data={data} close={handleClose}/>:null}


      <CardContent>
        <Typography sx={{ fontSize: 16,fontWeight:"bold" }} color="text.secondary" gutterBottom>
        <LocalGasStationIcon sx={{marginTop:"10px"}}/>{data.name}
        </Typography>
        <Typography variant="h5" component="div">
          {data.fuel}
        </Typography>
        <>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <Person4Icon sx={{paddingTop:"5px"}}/>{data.Emp}
        </Typography></>
        <Typography variant="body2">
          Early Metering:{data.EMtr} <br />
          Late Metering:{data.LMtr}
         
          
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClickOpen}><EditIcon/></Button>
      </CardActions>
    </Card>
  );
}
