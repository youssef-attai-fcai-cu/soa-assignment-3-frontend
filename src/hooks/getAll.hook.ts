import { useSetAtom } from "jotai";
import employeesAtom from "../atoms/employees.atom";
import * as EmployeeAPI from "../api/EmployeeAPI";
import { useCallback } from "react";

export default function useGetAllEmployees() {
  const setEmployees = useSetAtom(employeesAtom);
  return useCallback(async () => {
    const getAllResponse = await EmployeeAPI.getAllEmployees();
    if (getAllResponse.status === 200) {
      setEmployees(getAllResponse.data);
    }
  }, [setEmployees]);
}
