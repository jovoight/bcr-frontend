import { Box, Typography, Button, TextField, MenuItem } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import { ContextProps } from "../utils/props";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Rental } from "../utils/interfaces";
import { createRental } from "../utils/api";

export const RentalPage = () => {
	const { loggedIn, user, customers, dvds }: ContextProps = useOutletContext();
	const getRentDate = () => { return new Date().toISOString().substring(0,10); }
	const getDueDate = () => { const now = new Date(); return new Date(now.setDate(now.getDate() + 5)).toISOString().substring(0,10); }	
	const [rental, setRental] = useState<Rental>({
		customer_id: 0,
		employee_id: user?.id!,
		dvd_id: 0,
		payment_method: 'Cash',
		rent_date: getRentDate(),
		due_date: getDueDate(),
		payment_amount: 0
	});
	useEffect(() => console.log(rental), [rental]);

	// calculate DVD price from rental category
	const getDvdPrice = (dvdId: number) => {
		const dvd = dvds.find(dvd => dvd.id === dvdId);
		const rentalCategory = dvd!.rental_category;
		switch (rentalCategory) {
			case ('Current Hit'): return 2.00;
			case ('Current Release'): return 1.50;
			case ('Popular'): return 1.00;
			case ('Regular'): return 0.50;
		}
	}

	// form change handlers	
	const handleCustomerChange = (e: ChangeEvent<HTMLInputElement>) => {
		const customerName = e.target.value;
		const customer = customers.find(customer => customer.name === customerName)!;
		setRental(oldRental => ({ ...oldRental, customer_id: customer.id! }));
	}
	const handleDvdChange = (e: ChangeEvent<HTMLInputElement>) => {
		const dvdName = e.target.value;
		const dvd = dvds.find(dvd => dvd.name === dvdName)!;
		setRental(oldRental => ({ ...oldRental, dvd_id: dvd.id!, payment_amount: getDvdPrice(dvd.id!) }));
	}
	const handlePaymentMethodChange = (e: ChangeEvent<HTMLInputElement>) => {
		const paymentMethod = e.target.value as 'Cash' | 'Debit' | 'Credit';
		setRental(oldRental => ({ ...oldRental, payment_method: paymentMethod }));
	}

	// form submit handler
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		createRental(rental);
	}

  return (
    <Box sx={{
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '83vh',
    }}>
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
				<Typography variant='h4'>New Rental</Typography>
				<TextField
					variant='filled'
					select
					label='Customer'
					margin='dense'
					required
					fullWidth
					onChange={handleCustomerChange}
				>
					{customers.map((customer, index) =>
						<MenuItem key={index} value={customer.name}>{customer.name}</MenuItem>
					)}
				</TextField>
				<TextField
					variant='filled'
					select
					fullWidth
					required
					margin='dense'
					label='DVD'
					onChange={handleDvdChange}
				>
					{dvds.map((dvd, index) =>
						<MenuItem key={index} value={dvd.name}>{dvd.name}</MenuItem>
					)}
				</TextField>
				<TextField
					variant='filled'
					fullWidth
					required
					margin='dense'
					select
					label='Payment Method'
					onChange={handlePaymentMethodChange}
				>
					<MenuItem value='Credit'>Credit</MenuItem>
					<MenuItem value='Debit'>Debit</MenuItem>
					<MenuItem value='Cash'>Cash</MenuItem>
				</TextField>
				<Typography>Due Date: {rental.due_date}</Typography>
				{rental.dvd_id !== 0 && <Typography>Price: ${getDvdPrice(rental.dvd_id)}</Typography>}
				<Button variant='contained' type='submit' sx={{m: '0.5rem', width: '6rem'}}>Submit</Button>
			</Box>
			:
      <Typography>You are not logged in.</Typography>}
    </Box>
  );
};
