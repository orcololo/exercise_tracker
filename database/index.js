const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
mongoose
  .connect(
    process.env.MLAB_URI,
    { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
  )
  .then(console.log("DATABASE: Mongo is running."));

mongoose.Promise = global.Promise;

module.exports = mongoose;
