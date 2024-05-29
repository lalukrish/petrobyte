"use client";

import React, { createContext, useState } from "react";

export const PetrobyteContext= createContext();

function PetrobyteContextProvider({ children }) {
  const [refreshEmployee, setRefreshEmployee] = useState(false);
  

  return (
<PetrobyteContext.Provider
      value={{
        refreshEmployee,
        setRefreshEmployee
        
      }}
    >
      {children}
    </PetrobyteContext.Provider>
  );
}

export default PetrobyteContextProvider;
