import { Data } from "@angular/router"

export interface ITask{
  pageNumber: number,
  pageSize: number,
  data:ITaskData[] ,
  totalNumberOfRecords: number,
  totalNumberOfPages: number
}



export interface ITaskData {
      id: number,
      title: string,
      description: string,
      status: string,
      creationDate: Data,
      modificationDate: Data,
      project ?: IProject ,
      employee ?:IEmployee

}


export interface IProject{
  id: number,
  title: string,
  description: string,
  creationDate: Data,
  modificationDate: Data
}
export interface IEmployee{
  id:number,
  userName: string,
  imagePath:string,
  email: string,
  password: string,
  country: string,
  phoneNumber:number,
  verificationCode: string,
  isVerified: boolean,
  isActivated: boolean,
  creationDate: Data,
  modificationDate: Data
}


export interface IParams {
  pageNumber:number ,
  pageSize:number ,
  title?:string ,
  status?:string
}


