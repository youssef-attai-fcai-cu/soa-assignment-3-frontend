import { useSetAtom } from "jotai";

import * as EmployeeAPI from "../api/EmployeeAPI";
import employeesAtom from "../atoms/employees.atom";
import { useCallback } from "react";

export default function useDeleteEmployeeByID(id: number) {
  const setEmployees = useSetAtom(employeesAtom);

  return useCallback(async () => {
    const deleteResponse = await EmployeeAPI.deleteEmployeeByID(id);
    await EmployeeAPI.deleteEmployeeByID(id);

    if (deleteResponse.status === 200) {
      const getAllResponse = await EmployeeAPI.getAllEmployees();
      setEmployees(getAllResponse.data);
    }
  }, [id, setEmployees]);
}
