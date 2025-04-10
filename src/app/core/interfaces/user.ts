export interface Group {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

export interface User {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string;
  isActivated: boolean;
  group: Group;
  creationDate: string;
  modificationDate: string;
}
export interface ILogin{
  email:string;
  password:string;
  token?:string;
}
export interface IUpdateUserData {
  id?: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath?: string;
  confirmPassword: string;

}