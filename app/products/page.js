"use client";

import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import CreditTable from "@/components/credits/table";
import CreditNew from "@/components/credits/dialogcredit";
import ProductsTable from "@/components/products/tableproducts";
import ProductNew from "@/components/products/dialogproduct";

export default function page() {

  const [open, setOpen] = React.useState(false);
  
  



  
  
  return (
    <Box
      sx={{
        height: "100vh",
        backgroundRepeat: "no-repeat",
        width: "100%",
        color: "white",
        textAlign: "right",
        padding: "10px",
        
      }}
    >
      {/* <Button variant="outlined" 
        sx={{ marginBottom:"20px",color: "#0d47a1", border: "1px solid #0d47a1" }}
        onClick={handleClickOpen}
      >
        New Product
      </Button>
      {open ? <ProductNew  close={handleClose} /> : null} */}

      <ProductsTable/>
    </Box>
  );
}
