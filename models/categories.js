const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
  // id: {
  //   type: Number,
  //   unique: true
  // },
  user_id: {
    type: String,
    trim: true,
    required: [true, "Enter a user ID"],
    unique: true
  },
  type: {
    type: String,
    enum: ["Income", "Expense"],
    required: [true, "Select a category type"]
  },
  name: {
    type: String,
    required: [true, "Enter a category name"]
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

const Categories = mongoose.model("Categories", categoriesSchema);

module.exports = Categories;