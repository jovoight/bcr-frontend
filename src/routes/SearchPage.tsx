import { useEffect, useState } from "react";
import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { ContextProps } from "../utils/props";
import { useOutletContext } from "react-router-dom";
import { DataGrid, GridColDef, GridRowsProp, GridToolbar } from "@mui/x-data-grid";
import { Customer, Employee, Dvd, Rental } from "../utils/interfaces";
import { getCustomers, getDvds, getEmployees, getRentals } from "../utils/api";

export const SearchPage = () => {
  const { loggedIn }: ContextProps = useOutletContext();
  const [searchType, setSearchType] = useState<
    "Customers" | "Employees" | "DVDs" | "Rentals" | ""
  >("");
  // update everything when you navigate to this page
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

  // rows and cols
  const [activeRows, setActiveRows] = useState<GridRowsProp>([]);
  const [activeCols, setActiveCols] = useState<GridColDef[]>([]);

  // column configs
  const customerCols: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "address", headerName: "Address", flex: 2 },
    {
      field: "late_fees",
      headerName: "Late Fees",
      flex: 1,
      valueFormatter: (value) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(value);
      },
    },
  ];
  const dvdCols: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "genre", headerName: "Genre", flex: 1 },
    { field: "rental_category", headerName: "Rental Category", flex: 1.5 },
  ];
  const employeeCols: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "address", headerName: "Address", flex: 2 },
    { field: "rentals", headerName: "Rentals", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "password", headerName: "Password", flex: 1 },
  ];
  const rentalCols: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "customerName", headerName: "Customer", flex: 0.75 },
    { field: "dvdName", headerName: "DVD", flex: 0.75 },
    { field: "employeeName", headerName: "Employee", flex: 0.75 },
    { field: "payment_method", headerName: "Payment Method", flex: 1 },
    {
      field: "payment_amount",
      headerName: "Payment Amount",
      flex: 1,
      valueFormatter: (value) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(value);
      },
    },
    { field: "rent_date", headerName: "Rent Date", flex: 1 },
    { field: "due_date", headerName: "Due Date", flex: 1 },
    { field: "return_date", headerName: "Return Date", flex: 1 },
  ];

    
  useEffect(() => {
    switch (searchType) {
      case "Customers":
        setActiveRows(customers);
        setActiveCols(customerCols);
        break;
      case "DVDs":
        setActiveRows(dvds);
        setActiveCols(dvdCols);
        break;
      case "Employees":
        setActiveRows(employees);
        setActiveCols(employeeCols);
        break;
      case "Rentals":
        setActiveRows(rentals.map(rental => ({
          id: rental.id,
          customerName: customers.find(customer => customer.id === rental.customer_id)!.name,
          dvdName: dvds.find(dvd => dvd.id === rental.dvd_id)!.name,
          employeeName: employees.find(employee => employee.id === rental.employee_id)!.name,
          payment_method: rental.payment_method,
          payment_amount: rental.payment_amount,
          rent_date: rental.rent_date,
          due_date: rental.due_date,
          return_date: rental.return_date
        })));
        setActiveCols(rentalCols);
        break;
      default:
        break;
    }
  }, [searchType]);

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
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            bgcolor: "#090909",
            borderRadius: "0.5rem",
            p: "2rem",
          }}
        >
          <TextField
            select
            variant="filled"
            value={searchType}
            onChange={(e) =>
              setSearchType(
                e.target.value as "Customers" | "Employees" | "DVDs" | "Rentals"
              )
            }
            label="Search Type"
            sx={{ width: "15rem", mb: "1rem" }}
          >
            <MenuItem value="Customers">Customers</MenuItem>
            <MenuItem value="Employees">Employees</MenuItem>
            <MenuItem value="DVDs">DVDs</MenuItem>
            <MenuItem value="Rentals">Rentals</MenuItem>
          </TextField>
          <DataGrid columns={activeCols} rows={activeRows} slots={{ toolbar: GridToolbar }} />
        </Box>
      ) : (
        <Typography>You are not logged in.</Typography>
      )}
    </Box>
  );
};
