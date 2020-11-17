const express = require("express");
const db = require("../models");
const router = express.Router();
const moment = require("moment");
const auth = require("../middleware/auth");

// @route    POST api/expense
// @desc     Create an expense
// @access   Private
router.post(
  "/",
  auth,
  async (req, res) => {
    // console.log(req)
    try {
      const { name, amount, category } = req.body;
      const catUpsert = await db.Category.findOneAndUpdate({
        user_id : req.user.id, 
        name : category.trim()
            .toLowerCase()
            .split(" ")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" "),
        type: "Expense"
      },
      {},
      {upsert: true, new: true, runValidators: true});
      
      const newExpense = {
        amount: amount,
        name: name.trim()
            .toLowerCase()
            .split(" ")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" "),
        category_id: catUpsert._id,
        user_id: req.user.id,
        month_created : moment().format("M"),
        year_created : moment().format("YYYY"),
      };

      const expense = await db.Expense.create(newExpense);

      res.json(expense);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    Get api/expense
// @desc     Get ALL expense records
// @access   Private
router.get("/", auth, async(req,res) => {
  try {
    const expenseRec = await db.Expense.find({user_id : req.user.id}).sort({created_date: -1}).populate("category_id");
    res.json(expenseRec);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    Get 1 expense api/expense/:id
// @desc     Get 1 expense record
// @access   Private
router.get("/:id", auth, async(req,res) => {
  try {
    const expenseRec = await db.Expense.findById(req.params.id).populate('category_id');

     // Check for ObjectId format & expense record
     // 0-9, A-F, 24 characters
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !expenseRec) {
      return res.status(404).json({ msg: "Expense Record not found" });
    }

    res.json(expenseRec);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    Put 1 expense api/expense/:id
// @desc     Update 1 expense record
// @access   Private
router.put("/:id", auth, async(req, res) => {
  try {
    const expenseRec = await db.Expense.findById(req.params.id);
    const { name,amount, category } = req.body;

    const catUpsert = await db.Category.findOneAndUpdate({
        user_id : req.user.id, 
        name : category.trim()
            .toLowerCase()
            .split(" ")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" "),
        type: "Expense"
      },
      {},
        {upsert: true, new: true, runValidators: true});

    expenseRec.name = name.trim()
            .toLowerCase()
            .split(" ")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" ");
    expenseRec.amount = amount;
    expenseRec.category_id = catUpsert._id;
    await expenseRec.save();
    res.json(expenseRec);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route    DELETE api/expense/:id
// @desc     Delete an expense record
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const expenseRec = await db.Expense.findById(req.params.id);

     // Check for ObjectId format & expense record
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !expenseRec) {
      return res.status(404).json({ msg: "Expense Record not found" });
    }

    await expenseRec.remove();

    res.json({ msg: "Expense Record removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});


module.exports = router;