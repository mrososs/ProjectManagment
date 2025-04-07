export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  modificationDate: string;
  project: Project;
  employee: Employee;
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  manager: Manager;
}

export interface Manager {
  id: number;
  userName: string;
  imagePath: string;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  verificationCode: string | null;
  isVerified: boolean;
  isActivated: boolean;
  creationDate: string;
  modificationDate: string;
}

export interface Employee {
  id: number;
  userName: string;
  imagePath: string | null;
  email: string;
  password: string;
  country: string;
  phoneNumber: string;
  verificationCode: string | null;
  isVerified: boolean;
  isActivated: boolean;
  creationDate: string;
  modificationDate: string;
}
export interface ITaskAdd {
  title: string;
  description: string;
  employeeId: number;
  projectId: number;
}
