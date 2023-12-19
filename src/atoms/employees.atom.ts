import { atom } from "jotai";

import Employee from "../models/Employee.model";

const employeesAtom = atom<Employee[]>([]);


export default employeesAtom;
