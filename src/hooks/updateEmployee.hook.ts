import { useCallback } from "react";
import employeesAtom from "../atoms/employees.atom";
import * as EmployeeAPI from "../api/EmployeeAPI";
import { useSetAtom } from "jotai";
import Employee from "../models/Employee.model";

export default function useUpdateEmployee() {
  const setEmployees = useSetAtom(employeesAtom);

  return useCallback(
    async (ID: number, employee: Partial<Employee>) => {
      const updateResponse = await EmployeeAPI.updateEmployee(ID, employee);

      if (updateResponse.status === 200) {
        const getAllResponse = await EmployeeAPI.getAllEmployees();
        setEmployees(getAllResponse.data);
      }
    },
    [setEmployees]
  );
}
