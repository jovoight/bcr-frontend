import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Customer, Employee, Dvd } from '../utils/interfaces';
import {
  getCustomers,
  getEmployees,
  getDvds
} from '../utils/api';

export const Root = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<Employee | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [dvds, setDvds] = useState<Dvd[]>([]);

  useEffect(() => {
    getCustomers().then(res => setCustomers(res));
    getEmployees().then(res => setEmployees(res));
    getDvds().then(res => setDvds(res));
  }, []);

  return (
    <Box>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} />
      <Box component='main' sx={{ minHeight: '83vh' }}>
        <Outlet context={{ 
          loggedIn: loggedIn,
          setLoggedIn: setLoggedIn,
          user: user,
          setUser: setUser, 
          customers: customers,
          employees: employees,
          dvds: dvds
        }} />
      </Box>
      <Footer />
    </Box>
  );
}
