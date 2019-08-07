import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/noderest', {useFindAndModify: false, useNewUrlParser: true });
mongoose.Promise = global.Promise;


module.exports = mongoose;