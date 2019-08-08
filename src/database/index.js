import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/noderest', { useFindAndModify: false, useCreateIndex: true, useNewUrlParser: true });

// não sei o proque disso ~*_^~
mongoose.Promise = global.Promise;

export default mongoose;
