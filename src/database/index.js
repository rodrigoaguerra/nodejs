import mongoose from 'mongoose';

mongoose.connect(process.env.DB_URL, { useFindAndModify: false, useCreateIndex: true, useNewUrlParser: true });

// mongoose.Promise = global.Promise;

export default mongoose;
