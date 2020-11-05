const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
  id: {
    type: Number
  },
  user_id: {
    type: String,
    trim: true,
    required: "Enter a user ID"
  },
  type: {
    type: String,
    enum: ["Income", "Expense"]
  },
  name: {
    type: String,
    required: "Enter a category name"
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

const Categories = mongoose.model("Categories", categoriesSchema);

module.exports = Categories;