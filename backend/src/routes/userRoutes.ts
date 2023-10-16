import express from 'express';
import userSchema from '../models/userSchema';
import mongoose from 'mongoose';
import { IUser } from '../models/interfaces/interfaceUser';

const router = express();

function escapeRegex(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

router.get('/', async (req, res) => {
  const { email, phoneNumber } = req.query;

  let users: IUser[] = [];
  if (email === 'default') {
    email === undefined;
  }
  if (phoneNumber === 'default') {
    phoneNumber === undefined;
  }
  const regexEmail: string | RegExp | undefined =
    req.query.email && new RegExp(escapeRegex(req.query.email as string), 'gi');
  const regexPhoneNumber: string | RegExp | undefined =
    req.query.phoneNumber &&
    new RegExp(escapeRegex(req.query.phoneNumber as string), 'gi');

  if (
    (email === undefined || email === 'default') &&
    (phoneNumber === undefined || phoneNumber === 'default')
  ) {
    users = await userSchema.find();
    res.json(users);
  } else if (
    email !== undefined &&
    (phoneNumber === undefined || phoneNumber === 'default')
  ) {
    users = await userSchema.find({ email: regexEmail });
    res.json(users);
  } else if (
    (email === undefined || email === 'default') &&
    phoneNumber !== undefined
  ) {
    users = await userSchema.find({
      phoneNumber: { $elemMatch: { value: regexPhoneNumber } },
    });
    res.json(users);
  } else {
    users = await userSchema.find({
      $and: [
        { email: regexEmail },
        { phoneNumber: { $elemMatch: { value: regexPhoneNumber } } },
      ],
    });
    res.json(users);
  }
});

router.get('/:id', async (req, res) => {
  const _id: string = req.params.id;
  const user:
    | (mongoose.Document<unknown, {}, IUser> &
        IUser &
        Required<{ _id: string }>)
    | null = await userSchema.findById(_id);
  res.json(user);
});

router.post('/', async (req, res) => {
  const user: mongoose.Document<unknown, {}, IUser> &
    IUser &
    Required<{ _id: string }> = new userSchema({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: [
      { numberType: req.body.phoneNumberType, value: req.body.value },
    ],
  });
  user.save();
  res.json(user);
});

router.put('/:id', async (req, res) => {
  const updateUser:
    | (mongoose.Document<unknown, {}, IUser> &
        IUser &
        Required<{ _id: string }>)
    | null = await userSchema.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNumber: req.body.value && [
          { numberType: req.body.phoneNumberType, value: req.body.value },
        ],
      },
    }
  );
  updateUser?.save().then(async () => {
    const _id: string = req.params.id;
    const updatedUser:
      | (mongoose.Document<unknown, {}, IUser> &
          IUser &
          Required<{ _id: string }>)
      | null = await userSchema.findById(_id);
    res.json(updatedUser);
  });
});

router.delete('/:id', async (req, res) => {
  const _id: string = req.params.id;
  try {
    const user:
      | (mongoose.Document<unknown, {}, IUser> &
          IUser &
          Required<{ _id: string }>)
      | null = await userSchema.findByIdAndDelete(_id);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'An error occurred' });
  }
});

router.get('/email/:email', async (req, res) => {
  const email: string = req.params.email;
  const user: IUser | null = await userSchema.findOne({ email: email });
  res.json(user ? true : false);
});

module.exports = router;
