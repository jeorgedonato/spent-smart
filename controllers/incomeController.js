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
      const { amount, category } = req.body;
      const catUpsert = await db.Category.findOneAndUpdate(
        {name : category
          .trim()
            .toLowerCase()
            .split(" ")
            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" "),
          type : 'Income'},
        {userId: req.user.id},
        {new: true, upsert: true});
      
      const newIncome = {
        amount: amount,
        category_id: catUpsert.id,
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



module.exports = router;