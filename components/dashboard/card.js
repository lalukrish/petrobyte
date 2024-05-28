import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard({data}) {
  return (
    <Card sx={{width:"200px",backgroundColor:"lightgreen" }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {data.name}
        </Typography>
        <Typography variant="h5" component="div">
          {data.fuel}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {data.Emp}
        </Typography>
        <Typography variant="body2">
          Early Reading <br />
          Late Reading
         
          
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
}
