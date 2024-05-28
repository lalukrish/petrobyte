import BasicCard from '@/components/dashboard/card'
import Liverate from '@/components/dashboard/liverate'
import { Box, Typography } from '@mui/material'
import React from 'react'

const Employees = () => {
  let array=[
    {
      name:"Dispencer1",
      fuel:"Petrol",
      Emp:"Staff1",
      
    },
    {
      name:"Dispencer2",
      fuel:"Petrol",
      Emp:"Staff2",

    },
    {
      name:"Dispencer3",
      fuel:"Diesel",
      Emp:"Staff3",

    },
    {
      name:"Dispencer4",
      fuel:"Diesel",
      Emp:"Staff4",

    }
  ]
  return (
    <>
    <Box sx={{display:"flex", gap:2, justifyContent:"center"}}>
    {
    array.map((item)=>(<BasicCard data={item}/>))
      
    }
    
    </Box>
    <Box sx={{display:"flex",justifyContent:"center",marginTop:"20px"}}>
      <Liverate></Liverate>
    </Box>
    
    </>
  )
}

export default Employees