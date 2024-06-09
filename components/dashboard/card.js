import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Card';

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
    // <Grid>
    <>
        <Box>

    <Card sx={{
      width: "250px",
      backgroundColor: "white",
      boxShadow: 10,
      color: 'black',
      borderRadius: 2,
      padding: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      mt:4,

    }}>
      {open ? <DispencerDialog data={data} close={handleClose} /> : null}

      <CardContent>
        <Typography sx={{ fontSize: 16, fontWeight: "bold", display: 'flex', alignItems: 'center', mb: 2 }} color="text.secondary">
          <LocalGasStationIcon sx={{ marginRight: "8px" }} /> {data.name}
        </Typography>
        <Typography variant="h5" component="div" sx={{ mb: 2, fontWeight: 'bold' }}>
          {data.fuel}
        </Typography>
        <Typography sx={{ display: 'flex', alignItems: 'center', mb: 2 }} color="text.secondary">
          <Person4Icon sx={{ marginRight: "8px" }} /> {data.Emp}
        </Typography>
        <Typography variant="body2" sx={{ lineHeight: 1.6,fontSize:'18px'}}>
          <span>Early Metering:</span> {data.EMtr} <br />
          <span>Late Metering:</span> {data.LMtr}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button size="small" onClick={handleClickOpen}><EditIcon /></Button>
      </CardActions>
    </Card>
    {/* </Grid> */}
    </Box>
    </>
  );
}
