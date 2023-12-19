import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useDisclosure,
} from "@chakra-ui/react";
import useUpdateEmployee from "../hooks/updateEmployee.hook";
import Employee from "../models/Employee.model";
import { useEffect, useState } from "react";

type UpdateEmployeeModalProps = {
  originalEmployee: Employee;
};

export default function UpdateEmployeeModal({
  originalEmployee,
}: UpdateEmployeeModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [employee, setEmployee] = useState({
    ...originalEmployee,
  });

  useEffect(() => {
    console.log(originalEmployee);
    setEmployee(originalEmployee);
  }, [originalEmployee]);

  const updateEmployee = useUpdateEmployee();

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Update
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              disabled
              marginBottom={4}
              value={employee.EmployeeID}
              placeholder="Employee ID"
            />
            <Input
              marginBottom={4}
              value={employee.FirstName}
              placeholder="First Name"
              onChange={(e) => {
                setEmployee((employee) => ({
                  ...employee,
                  FirstName: e.target.value,
                }));
              }}
            />
            <Input
              marginBottom={4}
              placeholder="Last Name"
              value={employee.LastName}
              onChange={(e) => {
                setEmployee((employee) => ({
                  ...employee,
                  LastName: e.target.value,
                }));
              }}
            />
            <Input
              marginBottom={4}
              value={employee.Designation}
              placeholder="Designation"
              onChange={(e) => {
                setEmployee((employee) => ({
                  ...employee,
                  Designation: e.target.value,
                }));
              }}
            />
            <Heading marginBottom={4} size="sm">
              Known Languages
              <Button
                margin={2}
                onClick={() =>
                  setEmployee((employee) => ({
                    ...employee,
                    KnownLanguages: [
                      ...(employee.KnownLanguages ?? []),
                      {
                        LanguageName: "",
                        ScoreOutof100: 0,
                      },
                    ],
                  }))
                }
              >
                Add Language
              </Button>
            </Heading>
            {employee.KnownLanguages?.map((_, index) => (
              <Card key={index} marginBottom={4}>
                <CardBody>
                  <Input
                    marginBottom={4}
                    value={employee.KnownLanguages?.[index].LanguageName}
                    placeholder="Language Name"
                    onChange={(e) => {
                      setEmployee((employee) => ({
                        ...employee,
                        KnownLanguages: employee.KnownLanguages?.map(
                          (language, i) =>
                            i === index
                              ? {
                                  ...language,
                                  LanguageName: e.target.value,
                                }
                              : language
                        ),
                      }));
                    }}
                  />
                  <NumberInput
                    defaultValue={0}
                    min={0}
                    max={100}
                    value={employee.KnownLanguages?.[index].ScoreOutof100 ?? 0}
                    onChange={(e) => {
                      setEmployee((employee) => ({
                        ...employee,
                        KnownLanguages: employee.KnownLanguages?.map(
                          (language, i) =>
                            i === index
                              ? {
                                  ...language,
                                  ScoreOutof100: parseInt(e),
                                }
                              : language
                        ),
                      }));
                    }}
                  >
                    <NumberInputField placeholder="Score Out of 100" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </CardBody>
                <CardFooter>
                  <Button
                    colorScheme="red"
                    onClick={() =>
                      setEmployee((employee) => ({
                        ...employee,
                        KnownLanguages: employee.KnownLanguages?.filter(
                          (_, i) => i !== index
                        ),
                      }))
                    }
                  >
                    Remove Language
                  </Button>
                </CardFooter>
              </Card>
            )) ?? null}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                await updateEmployee(originalEmployee.EmployeeID, employee);
                onClose();
              }}
            >
              Update Employee
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
