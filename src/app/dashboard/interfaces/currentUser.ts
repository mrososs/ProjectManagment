
export interface ICurrentUser{

  id: number,
  userName: string,
  email: string,
  country :string ,
  phoneNumber: number,
  imagePath: string,
  isActivated: boolean,
  group :IGroup ,
  creationDate: Date,
  modificationDate : Date
}
export interface IGroup {
  id: number,
  name: string,
  creationDate: Date,
  modificationDate: Date
}


