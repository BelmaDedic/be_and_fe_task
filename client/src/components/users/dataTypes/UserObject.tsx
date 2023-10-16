export interface UserObject {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: IPhoneNumber;
}

export interface IPhoneNumber {
  numberType: string;
  value: string;
}
