import { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const Root = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(true);
  return (
    <Box>
      <Header loggedIn={loggedIn} />
      <Box component='main' sx={{ minHeight: '83vh' }}>
        <Outlet context={{ loggedIn: loggedIn }} />
      </Box>
      <Footer />
    </Box>
  );
}
