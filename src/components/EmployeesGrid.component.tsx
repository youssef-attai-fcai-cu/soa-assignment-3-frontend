import { Center, SimpleGrid, Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import employeesAtom from "../atoms/employees.atom";
import EmployeeCard from "./EmployeeCard.component";

export default function EmployeesGrid() {
  const employees = useAtomValue(employeesAtom);

  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      {employees.length === 0 ? (
        <Center>
          <Text>No Employees Found</Text>
        </Center>
      ) : (
        employees.map((employee, index) => (
          <EmployeeCard key={index} employeeID={employee.EmployeeID} />
        ))
      )}
    </SimpleGrid>
  );
}
