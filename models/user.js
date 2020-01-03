const mongoose = require("../database");
const shortid = require('shortid');

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: shortid.generate()
  },
  username: {
    type: String,
    require: true
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
