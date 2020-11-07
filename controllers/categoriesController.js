// Dependencies
const express = require('express');
const db = require("../models");
const router = express.Router();
const moment = require('moment');
const auth = require("../middleware/auth");

// POST route for saving a new category
router.post(
    "/",
    auth,
    async (req, res) => {
        try {
            const { amount, category } = req.body;
            const catUpsert = await db.Category.findOneAndUpdate(
                {
                    name: category
                        .trim()
                        .toLowerCase()
                        .split(" ")
                        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                        .join(" "),
                    type: "Categories"
                },
                { userId: req.user.id },
                { new: true, upsert: true });

            const newCategory = {
                category_id: catUpsert.id,
                // cat_name: req.category_name,
                user_id: req.user.id,
                month_created: moment().format("M"),
                year_created: moment().format("YYYY")
            };

            const category = await db.Category.create(newCategory);

            // res.json(dbCategory);
            res.json(category);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

// GET route for getting ALL of the categories
router.get("/", auth, async (req, res) => {
    try {
        const categoryRec = await db.Category.find({ user_id: req.user.id }).sort({ created_date: -1 });

        res.json(categoryRec);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// GET route for getting 1 category
router.get("/:id", auth, async (req, res) => {
    try {
        const categoryRec = await db.Category.findById(req.params.id);

        // Check for ObjectId format & category record
        // 0-9, A-F, 24 characters
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !categoryRec) {
            return res.status(404).json({ msg: "Category Record not found" });
        }

        res.json(categoryRec);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// PUT route for updating categories record
router.put("/:id", auth, async (req, res) => {
    try {
        const categoryRec = await db.Category.findById(req.params.id);
        const { amount, category_id } = req.body;
        categoryRec.amount = amount;
        categoryRec.category_id = category_id;
        await categoryRec.save();
        res.json(categoryRec);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// DELETE route for deleting a cat record.
router.delete("/:id", auth, async (req, res) => {
    try {
        const categoryRec = await db.Category.findById(req.params.id);

        // Check for ObjectId format & category  record
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !categoryRec) {
            return res.status(404).json({ msg: "Category Record not found" });
        }

        await categoryRec.remove();

        res.json({ msg: "Category Record removed" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;