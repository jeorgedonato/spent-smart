const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  id: {
    type: Number
  },
  email: {
    type: String,
    trim: true,
    required: "Enter your e-mail address"
  },
  password: {
    type: String
  },
  firstname: {
    type: String,
    trim: true,
    required: "Enter your first name"
  },
  lastname: {
    type: String,
    trim: true,
    required: "Enter your last name"
  },
  email_confirm: {
    type: Boolean,
    default: false
  },
  profile_picture: {
    type: String,
    get: v => `${root}${v}`
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;