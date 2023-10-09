import mongoose, { Schema } from "mongoose";
import {IUser} from './interfaceUser';

const UserSchema = new Schema<IUser>({
    _id: { type: String, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    phoneNumber: [ { numberType: {type: String}, value: {type: String} } ]
});
  
export default mongoose.model<IUser>('User', UserSchema);