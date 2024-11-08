import { ChangeEvent, FormEvent, useState } from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";

import { ContextProps } from "../utils/props";
import { Employee, Customer, Dvd } from "../utils/interfaces";
import { 
  createCustomer,
  createEmployee,
  createDvd,
  updateCustomer,
  updateEmployee,
  updateDvd,
  deleteCustomer,
  deleteEmployee,
  deleteDvd
} from "../utils/api";
 
export const AdminPage = () => {
  const { loggedIn, customers, employees, dvds }: ContextProps = useOutletContext();
  const [action, setAction] = useState<string>('');
  const [activeCustomer, setActiveCustomer] = useState<Customer>({
    name: '',
    address: ''
  });
  const [activeEmployee, setActiveEmployee] = useState<Employee>({
    name: '',
    address: '',
    username: '',
    password: ''
  });
  const [activeDvd, setActiveDvd] = useState<Dvd>({
    name: '',
    description: '',
    status: 'In Stock',
    genre: '',
    rental_category: 'Regular'
  });

  // customer change handlers
  const handleSelectedCustomerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSelectedCustomerName = e.target.value;
    const newSelectedCustomer = customers.find(customer => customer.name === newSelectedCustomerName)!;
    setActiveCustomer(newSelectedCustomer);
  }
  const handleCustomerNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newCustomerName = e.target.value;
    setActiveCustomer(oldCustomer => ({ ...oldCustomer, name: newCustomerName }));
  }
  const handleCustomerAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newCustomerAddress = e.target.value;
    setActiveCustomer(oldCustomer => ({ ...oldCustomer, address: newCustomerAddress }));
  }
  const handleCustomerLateFeesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newCustomerLateFees = e.target.value;
    setActiveCustomer(oldCustomer => ({ ...oldCustomer, late_fees: newCustomerLateFees }));
  }

  // employee change handlers
  const handleSelectedEmployeeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSelectedEmployeeName = e.target.value;
    const newSelectedEmployee = employees.find(employee => employee.name === newSelectedEmployeeName)!;
    setActiveEmployee(newSelectedEmployee);
  }
  const handleEmployeeNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmployeeName = e.target.value;
    setActiveEmployee(oldEmployee => ({ ...oldEmployee, name: newEmployeeName }));
  }
  const handleEmployeeAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmployeeAddress = e.target.value;
    setActiveEmployee(oldEmployee => ({ ...oldEmployee, address: newEmployeeAddress }));
  }
  const handleEmployeeUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmployeeUsername = e.target.value;
    setActiveEmployee(oldEmployee => ({ ...oldEmployee, username: newEmployeeUsername }));
  }
  const handleEmployeePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmployeePassword = e.target.value;
    setActiveEmployee(oldEmployee => ({ ...oldEmployee, password: newEmployeePassword }));
  }

  // dvd change handlers
  const handleSelectedDvdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSelectedDvdName = e.target.value;
    const newSelectedDvd = dvds.find(dvd => dvd.name === newSelectedDvdName)!;
    setActiveDvd(newSelectedDvd);
  }  
  const handleDvdNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDvdName = e.target.value;
    setActiveDvd(oldDvd => ({ ...oldDvd, name: newDvdName }));
  }
  const handleDvdDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDvdDescription = e.target.value;
    setActiveDvd(oldDvd => ({ ...oldDvd, description: newDvdDescription }));
  }
  const handleDvdGenreChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDvdGenre = e.target.value;
    setActiveDvd(oldDvd => ({ ...oldDvd, genre: newDvdGenre }));
  }
  const handleDvdRentalCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newDvdRentalCategory = e.target.value as 'Current Hit' | 'Current Release' | 'Popular' | 'Regular';
    setActiveDvd(oldDvd => ({ ...oldDvd, rental_category: newDvdRentalCategory }));
  }

  // form submit handler
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    switch (action) {
      case ('createCustomer'): createCustomer(activeCustomer); break;
      case ('updateCustomer'): updateCustomer(activeCustomer); break;
      case ('deleteCustomer'): deleteCustomer(activeCustomer); break;
      case ('createEmployee'): createEmployee(activeEmployee); break;
      case ('updateEmployee'):updateEmployee(activeEmployee); break;
      case ('deleteEmployee'): deleteEmployee(activeEmployee); break;
      case ('createDvd'): createDvd(activeDvd); break;
      case ('updateDvd'): updateDvd(activeDvd); break;
      case ('deleteDvd'): deleteDvd(activeDvd); break;
      default: break;
    }
  }

  return (
    <Box sx={{
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '83vh',
    }} >
      {loggedIn ?
      <Box component='form' onSubmit={handleSubmit} sx={{ 
        width: '100%', 
        maxWidth: '30rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: '#090909',
        borderRadius: '0.5rem',
        p: '2rem'
      }}>
        <Typography variant='h4'>Admin Portal</Typography>
        <TextField
          label='Action'
          variant='filled'
          margin='dense'
          select
          required
          fullWidth
          value={action}
          onChange={e => setAction(e.target.value)}
        >
          <MenuItem value='createCustomer'>Create New Customer</MenuItem>
          <MenuItem value='updateCustomer'>Update Customer</MenuItem>
          <MenuItem value='deleteCustomer'>Delete Customer</MenuItem>
          <MenuItem value='createEmployee'>Create New Employee</MenuItem>
          <MenuItem value='updateEmployee'>Update Employee</MenuItem>
          <MenuItem value='deleteEmployee'>Delete Employee</MenuItem>
          <MenuItem value='createDvd'>Create New DVD</MenuItem>
          <MenuItem value='updateDvd'>Update DVD</MenuItem>
          <MenuItem value='deleteDvd'>Delete DVD</MenuItem>
        </TextField>
        {action.includes('Customer') && <>
        {!action.includes('create') && 
        <TextField
          variant='filled'
          margin='dense'
          label='Select Customer'
          required
          fullWidth
          select
          onChange={handleSelectedCustomerChange}
        >
          {customers.map((customer, index) =>
            <MenuItem key={index} value={customer.name}>{customer.name}</MenuItem>
          )}
        </TextField>}
        {!action.includes('delete') && <>
        <TextField
          variant='filled'
          margin='dense'
          fullWidth
          required
          label='Customer Name'
          value={activeCustomer.name}
          onChange={handleCustomerNameChange}
        />
        <TextField
          variant='filled'
          margin='dense'
          fullWidth
          label='Customer Address'
          required
          value={activeCustomer.address}
          onChange={handleCustomerAddressChange}
        />
        <TextField
          variant='filled'
          margin='dense'
          required
          type='number'
          fullWidth
          label='Customer Late Fees'
          value={activeCustomer.late_fees || 0}
          onChange={handleCustomerLateFeesChange}
        />
        </>}
        </>}
        
        {action.includes('Employee') && <>
        {!action.includes('create') && 
        <TextField
          variant='filled'
          margin='dense'
          label='Select Employee'
          fullWidth
          required
          select
          onChange={handleSelectedEmployeeChange}
        >
          {employees.map((employee, index) =>
            <MenuItem key={index} value={employee.name}>{employee.name}</MenuItem>
          )}
        </TextField>}
        {!action.includes('delete') && <>
        <TextField
          variant='filled'
          margin='dense'
          required
          fullWidth
          label='Employee Name'
          value={activeEmployee.name}
          onChange={handleEmployeeNameChange}
        />
        <TextField
          variant='filled'
          margin='dense'
          fullWidth
          required
          label='Employee Address'
          value={activeEmployee.address}
          onChange={handleEmployeeAddressChange}
        />
        <TextField
          variant='filled'
          margin='dense'
          fullWidth
          required
          label='Employee Username'
          value={activeEmployee.username}
          onChange={handleEmployeeUsernameChange}
        />
        <TextField
          variant='filled'
          margin='dense'
          fullWidth
          required
          label='Employee Password'
          value={activeEmployee.password}
          onChange={handleEmployeePasswordChange}
        />
        </>}
        </>}

        
        {action.includes('Customer') && <>
        {!action.includes('create') && 
        <TextField
          variant='filled'
          margin='dense'
          label='Select Customer'
          fullWidth
          required
          select
          onChange={handleSelectedCustomerChange}
        >
          {customers.map((customer, index) =>
            <MenuItem key={index} value={customer.name}>{customer.name}</MenuItem>
          )}
        </TextField>}
        {!action.includes('delete') && <>
        <TextField
          variant='filled'
          required
          margin='dense'
          fullWidth
          label='Customer Name'
          value={activeCustomer.name}
          onChange={handleCustomerNameChange}
        />
        <TextField
          variant='filled'
          margin='dense'
          fullWidth
          required
          label='Customer Address'
          value={activeCustomer.address}
          onChange={handleCustomerAddressChange}
        />
        <TextField
          variant='filled'
          margin='dense'
          type='number'
          required
          fullWidth
          label='Customer Late Fees'
          value={activeCustomer.late_fees || 0}
          onChange={handleCustomerLateFeesChange}
        />
        </>}
        </>}

        {action.includes('Dvd') && <>
        {!action.includes('create') && 
        <TextField
          variant='filled'
          required
          margin='dense'
          label='Select DVD'
          fullWidth
          select
          onChange={handleSelectedDvdChange}
        >
          {dvds.map((dvd, index) =>
            <MenuItem key={index} value={dvd.name}>{dvd.name}</MenuItem>
          )}
        </TextField>}
        {!action.includes('delete') && <>
        <TextField
          variant='filled'
          required
          margin='dense'
          fullWidth
          label='DVD Name'
          value={activeDvd.name}
          onChange={handleDvdNameChange}
        />
        <TextField
          variant='filled'
          margin='dense'
          required
          fullWidth
          label='DVD Description'
          value={activeDvd.description}
          onChange={handleDvdDescriptionChange}
        />
        <TextField
          variant='filled'
          required
          margin='dense'
          fullWidth
          label='DVD Genre'
          value={activeDvd.genre}
          onChange={handleDvdGenreChange}
        />
        <TextField
          variant='filled'
          margin='dense'
          required
          fullWidth
          label='DVD Rental Category'
          value={activeDvd.rental_category}
          onChange={handleDvdRentalCategoryChange}
          select
        >
          <MenuItem value='Current Hit'>Current Hit</MenuItem>
          <MenuItem value='Current Release'>Current Release</MenuItem>
          <MenuItem value='Popular'>Popular</MenuItem>
          <MenuItem value='Regular'>Regular</MenuItem>
        </TextField>
        </>}
        </>}


        <Button type='submit' variant='contained' sx={{m: '0.5rem', width: '6rem'}}>Submit</Button>
      </Box>
      :
      <Typography>You are not logged in.</Typography>}
    </Box>
  );
};
