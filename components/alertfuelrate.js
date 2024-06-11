import React from 'react';
import { Box, Alert } from '@mui/material';

const BlinkingAlert = () => {
  const blinkingStyle = {
    animation: 'blink 1s infinite',
  };

  const keyframesStyle = `
    @keyframes blink {
      0% { opacity: 1; }
      50% { opacity: 0; }
      100% { opacity: 1; }
    }
  `;

  return (
    <Box sx={{ }}>
      <style>{keyframesStyle}</style>
      <Alert
        variant="outlined"
        severity="warning"
        
        sx={blinkingStyle}
      >
        Please make sure to update latest rate..!
      </Alert>
    </Box>
  );
};

export default BlinkingAlert;
