export interface IProjectsResponse {
    pageNumber: number;
    pageSize: number;
    totalNumberOfRecords: number;
    totalNumberOfPages: number;
    data: IProject[];
  }
  
export interface IProject {
    creationDate: string;
    modificationDate: string;
    description: string;
    task: Task[];
    title: string;
    id: number;
}
export interface IProAdd {
    description: string;
    title: string;
}

export interface Task {
    creationDate: string;
    modificationDate: string;
    description: string;
    title: string;
    id: number;
}