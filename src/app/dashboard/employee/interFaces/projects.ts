import { Data } from "@angular/router"
import { ITaskData } from "./tasks"

export interface IProject{
  pageNumber: number,
  pageSize: number,
  data:IProjectData[] ,
  totalNumberOfRecords: number,
  totalNumberOfPages: number
}


export interface IProjectData {
      id: number,
      title: string,
      description: string,
      creationDate: Data,
      modificationDate: Data,
      task: ITaskData [] ,
}


