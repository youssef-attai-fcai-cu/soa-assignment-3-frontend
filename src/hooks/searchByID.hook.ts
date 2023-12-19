import { useSetAtom } from "jotai";
import employeesAtom from "../atoms/employees.atom";
import * as EmployeeAPI from "../api/EmployeeAPI";
import { useCallback } from "react";

export default function useSearchByID() {
  const setEmployees = useSetAtom(employeesAtom);
  return useCallback(
    async (id: number) => {
      const searchResponse = await EmployeeAPI.searchByID(id);
      if (searchResponse.status === 200) {
        setEmployees(searchResponse.data.Employee);
      }
    },
    [setEmployees]
  );
}
