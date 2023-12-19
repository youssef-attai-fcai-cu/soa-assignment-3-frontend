import {
  Button,
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
import { atom, useAtom } from "jotai";
import useSearchByID from "../hooks/searchByID.hook";
import useSearchByDesignation from "../hooks/searchByDesignation.hook";
import useSearchByKnownLanguage from "../hooks/searchByKnownLanguage.hook";
import KnownLanguage from "../models/KnownLanguage.model";

const searchByIDAtom = atom<number>(1000);
const seachByDesignationAtom = atom<string>("");
const searchByKnownLanguageAtom = atom<KnownLanguage>({
  LanguageName: "",
  ScoreOutof100: 0,
});

type SearchModalProps = {
  by: "ID" | "Designation" | "Known Language";
};

export default function SearchModal({ by }: SearchModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchByID, setSearchByID] = useAtom(searchByIDAtom);
  const [searchByDesignation, setSearchByDesignation] = useAtom(
    seachByDesignationAtom
  );
  const [searchByKnownLanguage, setSearchByKnownLanguage] = useAtom(
    searchByKnownLanguageAtom
  );

  const searchEmployeeByID = useSearchByID();
  const searchEmployeeByDesignation = useSearchByDesignation();
  const searchEmployeeByKnownLanguage = useSearchByKnownLanguage();

  const byDesignationComponent = (
    <Input
      marginBottom={4}
      value={searchByDesignation}
      placeholder="Designation"
      onChange={(e) => {
        setSearchByDesignation(e.target.value);
      }}
    />
  );

  const byIDComponent = (
    <NumberInput
      marginBottom={4}
      defaultValue={1000}
      min={1000}
      step={1000}
      value={searchByID}
      onChange={(e) => {
        setSearchByID(parseInt(e));
      }}
    >
      <NumberInputField placeholder="Employee ID" />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );

  const byKnownLanguageComponent = (
    <>
      <Input
        marginBottom={4}
        value={searchByKnownLanguage.LanguageName}
        placeholder="Known Language"
        onChange={(e) => {
          setSearchByKnownLanguage({
            ...searchByKnownLanguage,
            LanguageName: e.target.value,
          });
        }}
      />
      <NumberInput
        marginBottom={4}
        defaultValue={0}
        min={0}
        max={100}
        value={searchByKnownLanguage.ScoreOutof100}
        onChange={(e) => {
          setSearchByKnownLanguage({
            ...searchByKnownLanguage,
            ScoreOutof100: parseInt(e),
          });
        }}
      >
        <NumberInputField placeholder="Score Out of 100" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </>
  );

  let searchComponent = <></>;

  if (by == "ID") {
    searchComponent = byIDComponent;
  } else if (by == "Designation") {
    searchComponent = byDesignationComponent;
  } else {
    searchComponent = byKnownLanguageComponent;
  }

  return (
    <>
      <Button onClick={onOpen}>Search by {by}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search for Employee By {by}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{searchComponent}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={async () => {
                if (by == "ID") {
                  await searchEmployeeByID(searchByID);
                } else if (by == "Designation") {
                  await searchEmployeeByDesignation(searchByDesignation);
                } else {
                  await searchEmployeeByKnownLanguage(searchByKnownLanguage);
                }
                onClose();
              }}
            >
              Search
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
