import { useEffect } from "react";
import { useSetAtom } from "jotai";

import employeesAtom from "./atoms/employees.atom";
import EmployeesGrid from "./components/EmployeesGrid.component";
import AddEmployeeModal from "./components/AddEmployeeModal.component";
import SearchModal from "./components/SearchModal.component";
import { RepeatIcon } from "@chakra-ui/icons";
import { Container, Flex, IconButton } from "@chakra-ui/react";
import useGetAllEmployees from "./hooks/getAll.hook";

function App() {
  const setEmployees = useSetAtom(employeesAtom);

  const getAllEmployees = useGetAllEmployees();

  useEffect(() => {
    fetch("http://127.0.01:8080/Employee/")
      .then((response) => response.json())
      .then((employees) => {
        console.log(employees);
        setEmployees(employees);
      });
  }, []);

  return (
    <>
      <Container maxW="container.xl">
        <Flex marginTop={4} marginBottom={4} gap={2}>
          <SearchModal by="ID" />
          <SearchModal by="Designation" />
          <SearchModal by="Known Language" />
          <AddEmployeeModal />
          <IconButton
            aria-label="Refresh"
            icon={<RepeatIcon />}
            onClick={async () => await getAllEmployees()}
          />
        </Flex>
        <EmployeesGrid />
      </Container>
    </>
  );
}

export default App;
