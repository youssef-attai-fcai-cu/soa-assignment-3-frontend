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
import useAddEmployee from "../hooks/addEmployee.hook";
import { useAtom } from "jotai";
import addEmployeeFormAtom from "../atoms/addEmployeeForm.atom";
import Employee from "../models/Employee.model";

export default function AddEmployeeModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [employee, setEmployee] = useAtom(addEmployeeFormAtom);
  const addEmployee = useAddEmployee();

  return (
    <>
      <Button onClick={onOpen}>Add Employee</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NumberInput
              marginBottom={4}
              defaultValue={1000}
              min={1000}
              step={1000}
              value={employee.EmployeeID}
              onChange={(e) => {
                setEmployee((employee) => ({
                  ...employee,
                  EmployeeID: parseInt(e),
                }));
              }}
            >
              <NumberInputField placeholder="Employee ID" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
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
              onClick={async () => {
                await addEmployee(employee as Employee);
                onClose();
              }}
            >
              Add Employee
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
