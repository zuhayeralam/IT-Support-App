import { readFile } from 'fs/promises';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './backend/db/connect.js';
import Issue from './backend/models/Issue.js';

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Issue.deleteMany();

    const jsonProducts = JSON.parse(
      await readFile(new URL('./mock-data.json', import.meta.url))
    );
    await Issue.create(jsonProducts);
    console.log('Success!!!!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
