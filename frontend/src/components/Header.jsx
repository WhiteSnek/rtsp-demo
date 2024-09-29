import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeaderContainer = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#121212',
  position: 'sticky',
  zIndex: 10,
}));

const Header = () => {
  return (
    <HeaderContainer>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RTSP
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Overlays</Button>
          <Button color="inherit">About</Button>
          <Button color="inherit">Contact</Button>
        </Box>
      </Toolbar>
    </HeaderContainer>
  );
};

export default Header;
