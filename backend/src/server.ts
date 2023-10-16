import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT: string | 5000 = process.env.PORT || 5000;

const userRoutes = require('./routes/userRoutes');
const addUsersFromArrays = require('./routes/addUsersFrom2ArraysRoutes');

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
const mongoDBlink: string = process.env.mongoDBlink || '';
mongoose.connect(mongoDBlink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

const connection: mongoose.Connection = mongoose.connection;
connection.once('open', (): void => {
  console.log('MongoDB database connection established successfully');
});

app.use('/users', userRoutes);
app.use('/add-users-from-given-arrays', addUsersFromArrays);

app.listen(PORT, (): void => {
  console.log(`Server is running on port ${PORT}`);
});
