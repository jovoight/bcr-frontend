import { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Employee } from '../utils/interfaces';

export const Root = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<Employee | null>(null);
  return (
    <Box>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} />
      <Box component='main' sx={{ minHeight: '83vh' }}>
        <Outlet context={{ 
          loggedIn: loggedIn,
          setLoggedIn: setLoggedIn,
          user: user,
          setUser: setUser, 
        }} />
      </Box>
      <Footer />
    </Box>
  );
}
