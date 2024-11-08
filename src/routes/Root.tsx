import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Customer, Employee, Dvd, Rental } from '../utils/interfaces';
import {
  getCustomers,
  getEmployees,
  getDvds,
  getRentals
} from '../utils/api';

export const Root = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<Employee | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [dvds, setDvds] = useState<Dvd[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);

  useEffect(() => {
    getCustomers().then(res => setCustomers(res));
    getEmployees().then(res => setEmployees(res));
    getDvds().then(res => setDvds(res));
    getRentals().then(res => setRentals(res));
  }, []);

  return (
    <Box>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUser={setUser} />
      <Box component='main' sx={{ minHeight: '83vh', p: '2rem' }}>
        <Outlet context={{ 
          loggedIn: loggedIn,
          setLoggedIn: setLoggedIn,
          user: user,
          setUser: setUser, 
          customers: customers,
          employees: employees,
          dvds: dvds,
          rentals: rentals
        }} />
      </Box>
      <Footer />
    </Box>
  );
}
