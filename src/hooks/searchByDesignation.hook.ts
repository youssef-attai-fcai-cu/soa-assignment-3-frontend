import { useSetAtom } from "jotai";
import employeesAtom from "../atoms/employees.atom";
import * as EmployeeAPI from "../api/EmployeeAPI";
import { useCallback } from "react";

export default function useSearchByDesignation() {
  const setEmployees = useSetAtom(employeesAtom);
  return useCallback(
    async (designation: string) => {
      const searchResponse = await EmployeeAPI.searchByDesignation(designation);
      if (searchResponse.status === 200) {
        setEmployees(searchResponse.data.Employees);
      }
    },
    [setEmployees]
  );
}
