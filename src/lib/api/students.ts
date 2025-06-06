import {
  HealthRecordResponse,
  StudentResponse,
  Student,
} from "@/lib/type/students";
import { fetchData } from "./api";

export const getHealthRecords = (
  page: number = 1,
  pageSize: number = 10
): Promise<HealthRecordResponse> => {
  return fetchData<HealthRecordResponse>(
    `/students?page=${page}&pageSize=${pageSize}`
  );
};

export const getStudents = (
  page: number = 1,
  pageSize: number = 10
): Promise<StudentResponse> => {
  return fetchData<StudentResponse>(
    `/students?page=${page}&pageSize=${pageSize}`
  );
};

export const createStudent = (
  data: Omit<Student, "_id" | "createdAt" | "updatedAt">
): Promise<Student> => {
  return fetchData<Student>("/students", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
export const updateStudent = (
  id: string,
  data: Partial<Omit<StudentResponse, "_id" | "createdAt" | "updatedAt">>
): Promise<StudentResponse> => {
  return fetchData<StudentResponse>(`/students/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};
export const deleteStudent = (id: string): Promise<void> => {
  return fetchData<void>(`/students/${id}`, {
    method: "DELETE",
  });
};
