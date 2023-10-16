import {
  userEmailsData,
  userPhoneNumberData,
} from '../services/prepareDataService';
import { IuserEmailsData } from '../models/interfaces/interfaceUserEmailData';
import { IUser } from '../models/interfaces/interfaceUser';
import mongoose from 'mongoose';
import userSchema from '../models/userSchema';
import { IUserPhoneNumberData } from '../models/interfaces/interfacePhoneNumberData';

const unknown: string = 'Unknown';

// Function for check is it enterd email unique or already used (is in database user with same email)
const isEmailUnique = async (email: string): Promise<boolean> => {
  let user: IUser | null;

  user = await userSchema.findOne({ email: email });
  return user == null ? true : false;
};

// Merging array userPhoneNumberData with elements from userEmailsData array
export const mergeEmailsIntoPhoneNumbers = async (): Promise<void> => {
  userPhoneNumberData.map(async (phoneNumber: IUserPhoneNumberData) => {
    const emailObject: IuserEmailsData | undefined = userEmailsData.find(
      (email: IuserEmailsData) => {
        return email.email === phoneNumber.email;
      }
    );

    if (emailObject === undefined && (await isEmailUnique(phoneNumber.email))) {
      const user: mongoose.Document<unknown, {}, IUser> &
        IUser &
        Required<{ _id: string }> = new userSchema({
        _id: new mongoose.Types.ObjectId(),
        firstName: unknown,
        lastName: unknown,
        email: phoneNumber.email,
        phoneNumber: [
          {
            numberType: phoneNumber.phoneNumbers.numberType,
            value: phoneNumber.phoneNumbers.value,
          },
        ],
      });
      user.save();
    }

    if (emailObject && (await isEmailUnique(phoneNumber.email))) {
      const user: mongoose.Document<unknown, {}, IUser> &
        IUser &
        Required<{ _id: string }> = new userSchema({
        _id: new mongoose.Types.ObjectId(),
        firstName: emailObject.firstName,
        lastName: emailObject.lastName,
        email: phoneNumber.email,
        phoneNumber: [
          {
            numberType: phoneNumber.phoneNumbers.numberType,
            value: phoneNumber.phoneNumbers.value,
          },
        ],
      });
      user.save();
    }
  });
};

// Merging array userEmailsData with elements from userPhoneNumberData array
export const mergePhoneNumbersIntoEmails = async (): Promise<void> => {
  userEmailsData.map(async (email: IuserEmailsData) => {
    const phoneNumberObject: IUserPhoneNumberData | undefined =
      userPhoneNumberData.find((phoneNumber) => {
        return phoneNumber.email === email.email;
      });

    if (phoneNumberObject === undefined && (await isEmailUnique(email.email))) {
      const user: mongoose.Document<unknown, {}, IUser> &
        IUser &
        Required<{ _id: string }> = new userSchema({
        _id: new mongoose.Types.ObjectId(),
        firstName: email.firstName,
        lastName: email.lastName,
        email: email.email,
        phoneNumber: [{ numberType: unknown, value: unknown }],
      });
      user.save();
    }

    if (phoneNumberObject && (await isEmailUnique(email.email))) {
      const user: mongoose.Document<unknown, {}, IUser> &
        IUser &
        Required<{ _id: string }> = new userSchema({
        _id: new mongoose.Types.ObjectId(),
        firstName: email.firstName,
        lastName: email.lastName,
        email: email.email,
        phoneNumber: [
          {
            numberType: phoneNumberObject.phoneNumbers.numberType,
            value: phoneNumberObject.phoneNumbers.value,
          },
        ],
      });
      user.save();
    }
  });
};
