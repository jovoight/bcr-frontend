import axios from "axios";

import {Employee} from "../utils/interfaces"

export const getUser = async (username: string, password: string) => {
    const res = await axios.get(import.meta.env.VITE_API + `/auth/?username=${username}&password=${password}`);
    const user: Employee = res.data;
    return user;
}