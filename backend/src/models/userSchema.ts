import mongoose, { Schema } from 'mongoose';
import { IUser } from './interfaces/interfaceUser';

const UserSchema = new Schema<IUser>({
  _id: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: [
    { numberType: { type: String, required: true }, value: { type: String } },
  ],
});

export default mongoose.model<IUser>('User', UserSchema);
