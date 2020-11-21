const express = require('express');
const db = require('../models');
const router = express.Router();
const moment = require('moment');
// const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// @route    POST api/income
// @desc     Create a income
// @access   Private
router.post(
  '/',
  auth,
  async (req, res) => {
    try {
      // const user = await User.findById(req.user.id).select('-password');
      const { description, amount, category } = req.body;
      const catUpsert = await db.Category.findOneAndUpdate({
        user_id : req.user.id, 
        name : category.trim()
            .toLowerCase()
            .split(" ")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" "),
        type: "Income"
      },
      {},
      {upsert: true, new: true, runValidators: true});

      const newIncome = {
        amount: parseFloat(amount),
        description,
        category_id: catUpsert._id,
        user_id: req.user.id,
        month_created : moment().format('M'),
        year_created : moment().format('YYYY'),
      };

      const income = await db.Income.create(newIncome);

      res.json(income);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    Get api/income
// @desc     Get All Income Records
// @access   Private
router.get('/', auth, async(req,res) => {
  try {
    const incomeRec = await db.Income.find({user_id : req.user.id}).populate('categories').sort({created_date: -1});
    res.json(incomeRec);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    Get One Income api/income/:id
// @desc     Get One Income Records
// @access   Private
router.get('/:id', auth, async(req,res) => {
  try {
    const incomeRec = await db.Income.findById(req.params.id).populate('categories');

     // Check for ObjectId format and income record
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !incomeRec) {
      return res.status(404).json({ msg: 'Income Record not found' });
    }

    res.json(incomeRec);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    Put One Income api/income/:id
// @desc     Update One Income Records
// @access   Private
router.put('/:id', auth, async(req, res) => {
  try {
    const incomeRec = await db.Income.findById(req.params.id);
    const { amount, category, description } = req.body;

    const catUpsert = await db.Category.findOneAndUpdate({
        user_id : req.user.id, 
        name : category.trim()
            .toLowerCase()
            .split(" ")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" "),
        type: "Income"
      },
      {},
        {upsert: true, new: true, runValidators: true});

    incomeRec.description = description;
    incomeRec.amount = amount;
    incomeRec.category_id = catUpsert._id;
    await incomeRec.save();
    res.json(incomeRec);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    DELETE api/income/:id
// @desc     Delete a income record
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const incomeRec = await db.Income.findById(req.params.id);

     // Check for ObjectId format and income record
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !incomeRec) {
      return res.status(404).json({ msg: 'Income Record not found' });
    }

    await incomeRec.remove();

    res.json({ msg: 'Income Record removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    GET api/incomes/monthly/month/year
// @desc     GET a monthly 
// @access   Private
router.get("/monthly/:month/:year", auth, async (req, res) => {
  try {
    const incomeRec = await db.Income.aggregate([
    {
        '$match': {
            'month_created': parseInt(req.params.month), 
            'year_created': parseInt(req.params.year)
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
    res.json(incomeRec);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});


module.exports = router;