import axios from "axios";

import { Customer, Employee, Dvd, Rental } from "../utils/interfaces";

// gets
export const getUser = async (username: string, password: string): Promise<Employee> => {
    const res = await axios.get(import.meta.env.VITE_API + `/auth/?username=${username}&password=${password}`);
    const user: Employee = res.data;
    return user;
}
export const getCustomers = async (): Promise<Customer[]> => {
    const res = await axios.get(import.meta.env.VITE_API + '/customers/');
    const customers: Customer[] = res.data;
    return customers;
}
export const getEmployees = async (): Promise<Employee[]> => {
    const res = await axios.get(import.meta.env.VITE_API + '/employees/');
    const employees: Employee[] = res.data;
    return employees;
}
export const getDvds = async (): Promise<Dvd[]> => {
    const res = await axios.get(import.meta.env.VITE_API + '/dvds/');
    const dvds: Dvd[] = res.data;
    return dvds;
}
export const getRentals = async (): Promise<Rental[]> => {
    const res = await axios.get(import.meta.env.VITE_API + '/rentals/');
    const rentals: Rental[] = res.data;
    return rentals;
}

// creates
export const createCustomer = async (customer: Customer) => {
    console.log(customer);
    await axios.post(import.meta.env.VITE_API + '/customers/', customer);
}
export const createEmployee = async (employee: Employee) => {
    await axios.post(import.meta.env.VITE_API + '/employees/', employee);
}
export const createDvd = async (dvd: Dvd) => {
    await axios.post(import.meta.env.VITE_API + '/dvds/', dvd);
}
export const createRental = async (rental: Rental) => {
    await axios.post(import.meta.env.VITE_API + '/rentals/', rental);
}

// updates
export const updateCustomer = async (customer: Customer) => {
    customer.late_fees = Number(customer.late_fees);
    await axios.put(import.meta.env.VITE_API + '/customers/', customer);
}
export const updateEmployee = async (employee: Employee) => {
    employee.rentals = Number(employee.rentals);
    await axios.put(import.meta.env.VITE_API + '/employees/', employee);
}
export const updateDvd = async (dvd: Dvd) => {
    await axios.put(import.meta.env.VITE_API + '/dvds/', dvd);
}
export const updateRental = async (rental: Rental) => {
    await axios.put(import.meta.env.VITE_API + '/rentals/', rental);
}

// deletes
export const deleteCustomer = async (customer: Customer) => {
    await axios.delete(import.meta.env.VITE_API + `/customers/${customer.id}`);
}
export const deleteEmployee = async (employee: Employee) => {
    await axios.delete(import.meta.env.VITE_API + `/employees/${employee.id}`);
}
export const deleteDvd = async (dvd: Dvd) => {
    await axios.delete(import.meta.env.VITE_API + `/dvds/${dvd.id}`);
}
// rentals should never be deleted for history purposes