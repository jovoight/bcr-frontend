import { Dispatch, SetStateAction } from "react";
import { Employee } from "./interfaces";

export interface HeaderProps {
	loggedIn: boolean;
	setLoggedIn: Dispatch<SetStateAction<boolean>>;
	setUser: Dispatch<SetStateAction<Employee | null>>;
}

export interface ContextProps {
	loggedIn: boolean;
	setLoggedIn: Dispatch<SetStateAction<boolean>>;
	user: Employee;
	setUser: Dispatch<SetStateAction<Employee | null>>;
}
