import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import {
  Typography,
  Slider,
  Box,
  Button,
  Paper,
  Card,
  CardContent,
  Grid,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const OverlayContainer = styled(Paper)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  padding: theme.spacing(3), 
  textAlign: 'center',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  zIndex: 10,
  color: '#fff', 
  borderRadius: '8px',
}));

const OverlayCard = styled(Card)(({ theme }) => ({
  backgroundColor: '#444', 
  color: '#fff',
  margin: '8px 0',
  cursor: 'pointer', 
  transition: 'transform 0.2s, box-shadow 0.2s', 
  '&:hover': {
    transform: 'scale(1.05)', 
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.5)', 
  },
}));

const OverlayManager = ({ text, setText, logoUrl, setLogoUrl }) => {
  const [overlays, setOverlays] = useState([]);
  const [selectedOverlay, setSelectedOverlay] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 150, height: 100 });

  useEffect(() => {
    fetchOverlays();
  }, []);

  const fetchOverlays = async () => {
    const response = await axios.get('/overlay');
    setOverlays(response.data);
  };

  const saveOverlay = async () => {
    const overlayData = { text, logoUrl, position, size };
    await axios.post('/overlay', overlayData);
    fetchOverlays();
    clearForm();
  };

  const updateOverlay = async (overlayId) => {
    const overlayData = { text, logoUrl, position, size };
    await axios.put(`/overlay/${overlayId}`, overlayData);
    fetchOverlays(); 
    clearForm();
  };

  const deleteOverlay = async (overlayId) => {
    await axios.delete(`/overlay/${overlayId}`);
    fetchOverlays(); 
  };

  const clearForm = () => {
    setText('');
    setLogoUrl('');
    setPosition({ x: 0, y: 0 });
    setSize({ width: 150, height: 100 });
    setSelectedOverlay(null);
  };

  const handleOverlaySelect = (overlay) => {
    setText(overlay.text);
    setLogoUrl(overlay.logoUrl);
    setPosition(overlay.position);
    setSize(overlay.size);
    setSelectedOverlay(overlay._id);
  };

  return (
    <div style={{ padding: '16px', borderRadius: '8px' }}>

      <Draggable
        bounds="parent"
        position={position}
        onDrag={(e, data) => setPosition({ x: data.x, y: data.y })}
      >
        <OverlayContainer style={{ width: size.width, height: size.height }}>
          {logoUrl && (
            <Box
              component="img"
              src={logoUrl}
              alt="Overlay Logo"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )}
          {text && (
            <Typography variant="h6" style={{ fontWeight: 'bold', marginTop: '10px', color: 'white' }}>
              {text}
            </Typography>
          )}
        </OverlayContainer>
      </Draggable>

      <Box mt={3} style={{ width: '80%', maxWidth: '300px', margin: 'auto' }}>
        <Typography variant="subtitle1" gutterBottom style={{ color: 'white' }}>
          Adjust Overlay Size
        </Typography>
        <Slider
          value={size.width}
          onChange={(e, newValue) => setSize((prevSize) => ({ ...prevSize, width: newValue }))}
          min={50}
          max={400}
          valueLabelDisplay="auto"
          aria-labelledby="overlay-width-slider"
          style={{ color: 'lightblue' }} 
        />
        <Slider
          value={size.height}
          onChange={(e, newValue) => setSize((prevSize) => ({ ...prevSize, height: newValue }))}
          min={50}
          max={300}
          valueLabelDisplay="auto"
          aria-labelledby="overlay-height-slider"
          style={{ color: 'lightblue' }} 
        />
      </Box>

      <Box mt={3} style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={selectedOverlay ? () => updateOverlay(selectedOverlay) : saveOverlay}
        >
          {selectedOverlay ? 'Update Overlay' : 'Save Overlay'}
        </Button>
        <Button variant="outlined" color="secondary" onClick={clearForm}>
          Clear Overlay
        </Button>
      </Box>

      <Box mt={3}>
        <Grid container spacing={2}>
          {overlays.length > 0 &&
            overlays.map((overlay) => (
              <Grid item xs={12} sm={6} md={6} lg={2} key={overlay._id}>
                <OverlayCard onClick={() => handleOverlaySelect(overlay)}>
                  <CardContent>
                    {overlay.logoUrl && (
                      <Box
                        component="img"
                        src={overlay.logoUrl}
                        alt="Overlay Image"
                        style={{ maxWidth: '200px', height: '200px',objectFit: 'cover', marginBottom: '10px' }}
                      />
                    )}
                    <Typography variant="h6">{overlay.text}</Typography>
                    <Typography variant="body2" style={{ color: '#bbb' }}>
                      Position: ({overlay.position?.x}, {overlay.position?.y})
                    </Typography>
                    <Box mt={2}>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          deleteOverlay(overlay._id);
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </OverlayCard>
              </Grid>
            ))}
        </Grid>
      </Box>
    </div>
  );
};

export default OverlayManager;
