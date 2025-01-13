import mongoose, { Connection } from 'mongoose';

import config from '../config/app.config';

const {
  database: { url },
} = config;

const connectDatabase = async (): Promise<void> => {
  try {
    mongoose.connection.on('connecting', () => {
      console.log('\n MongoDB: connecting.');
    });

    mongoose.connection.on('connected', () => {
      console.log('\n MongoDB: connected.');
    });

    mongoose.connection.on('disconnecting', () => {
      console.log('\n MongoDB: disconnecting.');
    });

    mongoose.connection.on('disconnected', () => {
      console.log('\n MongoDB: disconnected.');
    });

    if (mongoose.connection.readyState !== 1 && mongoose.connection.readyState !== 2) {
      await mongoose.connect(url, {
        autoIndex: true,
        serverSelectionTimeoutMS: 5000,
      });
    }
  } catch (error) {
    console.log('Error connecting to DB', error);
  }
};

export { connectDatabase };
