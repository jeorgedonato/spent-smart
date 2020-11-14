const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  // id: {
  //   type: Number,
  //   unique: true
  // },
  name : {
    type: String
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'User'
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Categories'
  },
  month_created: {
    type: Number
  },
  year_created: {
    type: Number
  },
  amount: {
    type: Number,
    required: [true, "Enter an amount"]
  },
  due_date: {
    type: Date,
    default: Date.now
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;