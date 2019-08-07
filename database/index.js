import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/noderest', { useMongoClient : true });
mongoose.Promise = global.Promise;


module.exports = mongoose;