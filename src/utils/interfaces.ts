export interface Employee {
    id?: number;
    name: string;
    address: string;
    rentals?: number | string;
    username: string;
    password: string;
}
export interface Customer {
    id?: number;
    name: string;
    address: string;
    late_fees?: number | string;
}
export interface Dvd {
    id?: number;
    name: string;
    status?: 'In Stock' | 'Out of Stock';
    description: string;
    genre: string;
    rental_category: 'Current Hit' | 'Current Release' | 'Popular' | 'Regular';
}
export interface Rental {
    id?: number;
    customer_id: number;
    dvd_id: number;
    employee_id: number;
    payment_method: 'Cash' | 'Debit' | 'Credit';
    rent_date: string;
    due_date: string;
    return_date?: string;
    payment_amount: number;
}