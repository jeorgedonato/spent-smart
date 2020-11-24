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
      const { description, amount, category } = req.body;
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
        amount: parseFloat(amount),
        description,
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
    // console.log(req.params.id)
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
    const { description, amount, category } = req.body;

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

    expenseRec.description = description
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

// @route    GET api/expenses/monthly/month/year
// @desc     GET a monthly 
// @access   Private
router.get("/monthly/:month/:year", auth, async (req, res) => {
  try {
    const expenseRec = await db.Expense.aggregate([
    {
        '$match': {
            'month_created': parseInt(req.params.month), 
            'year_created': parseInt(req.params.year),
            'user_id' : req.user.id
        }
    }, {
        '$group': {
            '_id': null, 
            'sum': {
                '$sum': '$amount'
            }
        }
    }
]);
// console.log(expenseRec);
    res.json(expenseRec);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    GET api/expenses/monthly/categories/month/year
// @desc     GET a monthly 
// @access   Private
router.get("/monthly/categories/:month/:year", auth, async (req, res) => {
  try {
    const expenseRec = await db.Expense.aggregate([
    {
        '$match': {
            'month_created': parseInt(req.params.month), 
            'year_created': parseInt(req.params.year),
            'user_id' : req.user.id
        }
    }, {
        '$group': {
            '_id': '$category_id', 
            'amount': {
                '$sum': '$amount'
            }
        }
    }, {
        '$lookup': {
            'from': 'categories', 
            'localField': '_id', 
            'foreignField': '_id', 
            'as': 'category'
        }
    }
]);
// const populatedExpense = db.Category.populate(expenseRec, {path: "categories"});
// console.log(expenseRec);
    res.json(expenseRec);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});


router.get("/yearly/savings/:year", auth, async (req, res) => {
  try {
    const expenseRes = await db.Expense.find({year_created : req.params.year, user_id: req.user.id}).sort({created_date: -1}).populate("category_id");
    const incomeRes = await db.Income.find({year_created : req.params.year, user_id: req.user.id}).sort({created_date: -1}).populate("category_id");
    res.json({income : incomeRes,expense : expenseRes})
  } catch (error) { 
    console.error(err.message);
    res.status(500).send("Server Error");
  }
})


module.exports = router;