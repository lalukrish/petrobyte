import React from 'react';
const { Card, CardContent, CardActions, Typography, Button } = require("@mui/material");

function Liverate() {
  return (
    




<Card sx={{width:"850px",height:"150px",backgroundColor:"lightgreen" }}>
<CardContent>
<Typography variant="h5" component="div">
    Petrol:
  </Typography>
  <Typography variant="h5" component="div">
    Diesel:
  </Typography>
  <Typography sx={{ mb: 1.5 }} color="text.secondary">
    
  </Typography>
  <Typography variant="body2">
    
    
  </Typography>
</CardContent>
<CardActions>
  <Button size="small">View</Button>
</CardActions>
</Card>
);
}
  

export default Liverate