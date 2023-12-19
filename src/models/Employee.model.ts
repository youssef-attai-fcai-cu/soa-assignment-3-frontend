import KnownLanguage from "./KnownLanguage.model";

type Employee = {
  EmployeeID: number;
  FirstName: string;
  LastName: string;
  Designation: string;
  KnownLanguages: KnownLanguage[];
};

export default Employee;
