import { useSetAtom } from "jotai";
import employeesAtom from "../atoms/employees.atom";
import * as EmployeeAPI from "../api/EmployeeAPI";
import { useCallback } from "react";
import KnownLanguage from "../models/KnownLanguage.model";

export default function useSearchByKnownLanguage() {
  const setEmployees = useSetAtom(employeesAtom);
  return useCallback(
    async (lanugage: KnownLanguage) => {
      const searchResponse = await EmployeeAPI.searchByKnownLanguage(lanugage);
      if (searchResponse.status === 200) {
        setEmployees(searchResponse.data);
      }
    },
    [setEmployees]
  );
}
