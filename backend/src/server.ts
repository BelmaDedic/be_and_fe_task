// src/server.ts
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userSchema from './models/userSchema';

const app = express();
const PORT = process.env.PORT || 5000;

const userRoutes = require('./routes/userRoutes');

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://belma:svadba1712@cluster0.kn4cg.mongodb.net/be_and_fe_task', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as ConnectOptions);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
