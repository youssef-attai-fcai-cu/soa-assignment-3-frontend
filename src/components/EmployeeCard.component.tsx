import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import useDeleteEmployeeByID from "../hooks/deleteEmployeeByID.hook";
import UpdateEmployeeModal from "./UpdateEmployeeModal.component";
import { useAtomValue } from "jotai";
import employeesAtom from "../atoms/employees.atom";

type EmployeeCardProps = {
  employeeID: number;
};

export default function EmployeeCard({ employeeID }: EmployeeCardProps) {
  const employees = useAtomValue(employeesAtom);
  const employee = employees.find(
    (employee) => employee.EmployeeID === employeeID
  )!;

  const deleteEmployeeByID = useDeleteEmployeeByID(employeeID);

  return (
    <Card>
      <CardHeader>
        <Heading size="md">
          {employee.FirstName} {employee.LastName}
          <Badge margin={2}>{employee.EmployeeID}</Badge>
        </Heading>
        <Text>{employee.Designation}</Text>
      </CardHeader>
      <CardBody>
        <Heading size="sm">Known Languages</Heading>
        {employee.KnownLanguages.map((language, index) => (
          <Text key={index}>
            - {language.LanguageName}
            <Badge margin={1} colorScheme="green">
              {language.ScoreOutof100}
            </Badge>
          </Text>
        ))}
      </CardBody>
      <CardFooter>
        <ButtonGroup>
          <UpdateEmployeeModal originalEmployee={employee} />
          <Button
            colorScheme="red"
            onClick={async () => await deleteEmployeeByID()}
          >
            Delete
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}
