import { Document } from 'mongoose';

export interface IUser extends Document {
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
