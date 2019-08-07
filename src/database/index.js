import mongoose from 'mongoose';

// boa
mongoose.connect('mongodb://localhost/noderest', {
  useFindAndModify: false,
  useNewUrlParser: true,
});
// pq a linha de baixo é necessária?
mongoose.Promise = global.Promise;

// evite module.exports
export default mongoose;
