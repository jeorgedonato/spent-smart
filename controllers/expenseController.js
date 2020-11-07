const express = require("express");
const db = require("../models");
const router = express.Router();
const moment = require("moment");
const auth = require("../middleware/auth");

// ==================================================
// Defining methods for the expenseController
// module.exports = {
//     findAll: function (req, res) {
//         db.Expense
//             .find(req.query)
//             // .sort({ date: -1 })
//             .then(dbExpense => res.json(dbExpense))
//             .catch(err => res.status(422).json(err));
//     },

//     findById: function (req, res) {
//         db.Expense
//             .findById(req.params.id)
//             .then(dbExpense => res.json(dbExpense))
//             .catch(err => res.status(422).json(err));
//     },

//     create: function (req, res) {
//         db.Expense
//             .create(req.body)
//             .then(dbExpense => res.json(dbExpense))
//             .catch(err => res.status(422).json(err));
//     },

//     update: function (req, res) {
//         db.Expense
//             .findOneAndUpdate({ _id: req.params.id }, req.body)
//             .then(dbExpense => res.json(dbExpense))
//             .catch(err => res.status(422).json(err));
//     },

//     remove: function (req, res) {
//         db.Expense
//             .findById({ _id: req.params.id })
//             .then(dbExpense => dbExpense.remove())
//             .then(dbExpense => res.json(dbExpense))
//             .catch(err => res.status(422).json(err));
//     }
// };
// ==================================================


// @route    POST api/expense
// @desc     Create an expense
// @access   Private
router.post(
  "/",
  auth,
  async (req, res) => {
    try {
      const { amount, category } = req.body;
      const catUpsert = await db.Category.findOneAndUpdate(
        {name : category
          .trim()
            .toLowerCase()
            .split(" ")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" "),
          type : "Expense"},
        {userId: req.user.id},
        {new: true, upsert: true});
      
      const newExpense = {
        amount: amount,
        category_id: catUpsert.id,
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
    const expenseRec = await db.Expense.find({user_id : req.user.id}).sort({created_date: -1});
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
    const expenseRec = await db.Expense.findById(req.params.id);

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
    const { amount, category_id } = req.body;
    expenseRec.amount = amount;
    expenseRec.category_id = category_id;
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