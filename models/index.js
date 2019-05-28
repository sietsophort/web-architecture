import mongoose from 'mongoose';

import User from './user';

const connectDb = () => mongoose.connect('mongodb://localhost:27017/web-arch', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
const models = { User };

export {
  connectDb,
  models,
};
