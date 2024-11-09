import { MenuItem, Box, Typography, Button, TextField, Alert } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { ContextProps } from "../utils/props";
import { FormEvent, useState, useEffect } from "react";
import { getCustomers, getDvds, getRentals, updateCustomer, updateDvd, updateRental } from "../utils/api";
import { Rental, Customer, Dvd } from "../utils/interfaces";

export const ReturnPage = () => {
  // update everything when you navigate to this page
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [dvds, setDvds] = useState<Dvd[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  useEffect(() => {
    getCustomers().then(res => setCustomers(res));
    getDvds().then(res => setDvds(res));
    getRentals().then(res => setRentals(res));
  }, []);

  const { loggedIn }: ContextProps = useOutletContext();
	const [customerName, setCustomerName] = useState<string>('');
	const [dvdName, setDvdName] = useState<string>('');
	const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const customerReturning = customers.find(customer => customer.name === customerName)!;
		const dvdBeingReturned = dvds.find(dvd => dvd.name === dvdName)!;
		// return the oldest rental that matches
		const rentalMatches = rentals.filter(rental => 
			rental.customer_id === customerReturning.id && 
			rental.dvd_id === dvdBeingReturned.id &&
			rental.return_date === null
		);
    console.log(rentalMatches);    

		const rentalBeingReturned = rentalMatches.sort((a: Rental, b: Rental) => { 
			return new Date(a.rent_date).getDate() - new Date(b.rent_date).getDate() 
		})[0];
		if (!rentalBeingReturned) {
      setSuccess(false);
			setError('Rental not found.');
		} else {
			console.log(rentalBeingReturned);
			setError('');
			const today = new Date();
			// assign late fees
			const daysOverdue = Math.ceil(today.getDate() - new Date(rentalBeingReturned.due_date).getDate());
			if (daysOverdue > 0) {
				// $1 per day late
				const oldLateFees = Number(customerReturning.late_fees);
				customerReturning.late_fees = oldLateFees + daysOverdue;
				updateCustomer(customerReturning);
			}
			// update the movie as being back in stock
			const dvd = dvds.find(dvd => dvd.id === rentalBeingReturned.dvd_id)!;
			dvd.status = 'In Stock';
			updateDvd(dvd);
			// update the rental with the return date
			rentalBeingReturned.return_date = today.toISOString().substring(0, 10);
			updateRental(rentalBeingReturned);
      setSuccess(true);
		}
	}

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "83vh",
      }}
    >
      {loggedIn ? (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%",
            maxWidth: "30rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#090909",
            borderRadius: "0.5rem",
            p: "2rem",
          }}
        >
          <Typography variant="h4">New Return</Typography>
          <TextField
            variant="filled"
            select
            label="Customer Name"
            margin="dense"
            required
            fullWidth
            onChange={e => setCustomerName(e.target.value)}
          >
            {customers.map((customer, index) => (
              <MenuItem key={index} value={customer.name}>
                {customer.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            variant="filled"
            select
            fullWidth
            required
            margin="dense"
            label="DVD Name"
            onChange={e => setDvdName(e.target.value)}
          >
            {dvds.map((dvd, index) => (
              <MenuItem key={index} value={dvd.name}>
                {dvd.name}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            type="submit"
            sx={{ m: "0.5rem", width: "6rem" }}
          >
            Submit
          </Button>
					{error && <Alert severity='error'>{error}</Alert>}
          {success && <Alert severity='success'>Successfully Submitted</Alert>}
        </Box>
      ) : (
        <Typography>You are not logged in.</Typography>
      )}
    </Box>
  );
};
