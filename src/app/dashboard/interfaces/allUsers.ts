import {  ITaskData } from "../employee/interFaces/tasks"

export interface IAllUsers {
    pageNumber: number,
    pageSize: number,
    data: IUsersData[] ,
    totalNumberOfRecords: number,
    totalNumberOfPages: number
}

export interface IUsersData {
  id: number,
  userName: string,
  email: string,
  country :string ,
  phoneNumber: number,
  imagePath: string,
  isActivated: boolean,
  task : ITaskData []
}
