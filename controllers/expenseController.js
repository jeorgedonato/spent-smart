const db = require("../models");
const auth = require("../middleware/auth");

// Defining methods for the expenseController
module.exports = {
    findAll: function (req, res) {
        db.Expense
            .find(req.query)
            // .sort({ date: -1 })
            .then(dbExpense => res.json(dbExpense))
            .catch(err => res.status(422).json(err));
    },

    findById: function (req, res) {
        db.Expense
            .findById(req.params.id)
            .then(dbExpense => res.json(dbExpense))
            .catch(err => res.status(422).json(err));
    },

    create: function (req, res) {
        db.Expense
            .create(req.body)
            .then(dbExpense => res.json(dbExpense))
            .catch(err => res.status(422).json(err));
    },

    update: function (req, res) {
        db.Expense
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbExpense => res.json(dbExpense))
            .catch(err => res.status(422).json(err));
    },

    remove: function (req, res) {
        db.Expense
            .findById({ _id: req.params.id })
            .then(dbExpense => dbExpense.remove())
            .then(dbExpense => res.json(dbExpense))
            .catch(err => res.status(422).json(err));
    }
};
