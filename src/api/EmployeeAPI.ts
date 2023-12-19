import Employee from "../models/Employee.model";
import KnownLanguage from "../models/KnownLanguage.model";
import axiosInstance from "./axiosInstance";

export async function addEmployee(employee: Employee) {
  return await axiosInstance.post("/", employee);
}

export async function deleteEmployeeByID(id: number) {
  return await axiosInstance.delete(`/deleteByID/${id}`);
}

export async function getAllEmployees() {
  return await axiosInstance.get("/");
}
export function updateEmployee(ID: number, employee: Partial<Employee>) {
  return axiosInstance.patch(`/updateByID/${ID}`, employee);
}
export function searchByID(id: number) {
  return axiosInstance.get(`/ByID/${id}`);
}
export function searchByDesignation(designation: string) {
  return axiosInstance.get(`/ByDesignation/${designation}`);
}
export function searchByKnownLanguage(lanugage: KnownLanguage) {
  return axiosInstance.get(
    `/experts?language=${lanugage.LanguageName}&score=${lanugage.ScoreOutof100}`
  );
}
