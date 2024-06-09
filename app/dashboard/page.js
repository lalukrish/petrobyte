"use client"

import BasicCard from '@/components/dashboard/card'
import Liverate from '@/components/dashboard/liverate'
import { Box, Typography,Grid } from '@mui/material'
import React from 'react'


const Employees = () => {

  let array=[
    {
      name:"D1",
      fuel:"Petrol",
      Emp:"Staff1",
      EMtr:"00",
      LMtr:"00"
      
    },
    {
      name:"D2",
      fuel:"Petrol",
      Emp:"Staff2",
      EMtr:"00",
      LMtr:"00"

    },
    {
      name:"D3",
      fuel:"Diesel",
      Emp:"Staff3",
      EMtr:"00",
      LMtr:"00"

    },
    {
      name:"D4",
      fuel:"Diesel",
      Emp:"Staff4",
      EMtr:"00",
      LMtr:"00"

    }
  ]
  return (
    <>
   
    <Box sx={{ flexGrow: 1}}>
      <Box sx={{ marginTop: "1px", mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "start" }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold',fontSize:"40px" }}>Today Price</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Liverate />
        </Box>
      </Box>
      
      <Box>    
        
            <Box >
      <Typography variant="h6" sx={{ fontWeight: 'bold',fontSize:"40px" }}>Dispencers</Typography>
      </Box>
      <Grid container spacing={6} >

        {array.map((item, index) => (
          <Grid item key={index} >
            <BasicCard data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
    </Box>
    </>
  )
}

export default Employees