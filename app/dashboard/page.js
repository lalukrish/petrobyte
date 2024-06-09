"use client"

import BasicCard from '@/components/dashboard/card'
import Liverate from '@/components/dashboard/liverate'
import { Box, Typography } from '@mui/material'
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
     <Box sx={{display:"flex",justifyContent:"center",marginTop:"2px"}}>
      <Liverate />
    </Box>
    <Box sx={{display:"flex", gap:2, justifyContent:"center",mt:4}}>
    
    {
    array.map((item)=>(<BasicCard data={item}/>))    
    }
    
    </Box>
   
    
    </>
  )
}

export default Employees