import mongoose from 'mongoose';

import User from './user.js';
// import Message from './message';

const connectDb = () => {
  return mongoose.connect('mongodb://localhost:27017/web-arch');
};

const models = { User };

module.exports = connectDb;

module.exports = models;
