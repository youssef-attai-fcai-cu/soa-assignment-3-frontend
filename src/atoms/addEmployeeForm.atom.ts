import { atom } from "jotai";
import Employee from "../models/Employee.model";

const addEmployeeFormAtom = atom<Employee>({
  EmployeeID: 1000,
  FirstName: "",
  LastName: "",
  Designation: "",
  KnownLanguages: [],
});

export default addEmployeeFormAtom;
