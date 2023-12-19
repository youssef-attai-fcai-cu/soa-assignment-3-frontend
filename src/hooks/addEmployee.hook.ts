import { useCallback } from "react";
import employeesAtom from "../atoms/employees.atom";
import * as EmployeeAPI from "../api/EmployeeAPI";
import { useSetAtom } from "jotai";
import Employee from "../models/Employee.model";

export default function useAddEmployee() {
  const setEmployees = useSetAtom(employeesAtom);

  return useCallback(
    async (employee: Employee) => {
      try {
        await EmployeeAPI.addEmployee(employee);
        const getAllResponse = await EmployeeAPI.getAllEmployees();
        setEmployees(getAllResponse.data);
      } catch (error) {
        alert("Error adding employee");
      }
    },
    [setEmployees]
  );
}
