import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

const OverlayForm = ({ setText, setLogoUrl }) => {
  const [textValue, setTextValue] = useState('');
  const [logoUrlValue, setLogoUrlValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setText(textValue);
    setLogoUrl(logoUrlValue);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
        padding: 4,
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '600px',
        margin: '0 auto',
      }}
    >
      <Typography variant="h5" color="white" gutterBottom>
        Set Overlay Options
      </Typography>

      <TextField
        label="Overlay Text"
        variant="outlined"
        fullWidth
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
        InputLabelProps={{
          style: { color: '#cfd8dc' },
        }}
        InputProps={{
          style: { color: '#fff', backgroundColor: '#2e2e2e', borderRadius: '4px' },
        }}
      />

      <TextField
        label="Overlay Logo URL"
        variant="outlined"
        fullWidth
        value={logoUrlValue}
        onChange={(e) => setLogoUrlValue(e.target.value)}
        InputLabelProps={{
          style: { color: '#cfd8dc' },
        }}
        InputProps={{
          style: { color: '#fff', backgroundColor: '#2e2e2e', borderRadius: '4px' },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: '#1976d2',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#115293',
          },
          padding: '10px 20px',
          borderRadius: '8px',
          fontSize: '16px',
        }}
      >
        Set Overlay
      </Button>
    </Box>
  );
};

export default OverlayForm;
