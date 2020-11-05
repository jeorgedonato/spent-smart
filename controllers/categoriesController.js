// api-routes.js - file offers a set of routes for displaying & saving data to the db

// Dependencies
const express = require('express');
const db = require("../models");
const router = express.Router();
const moment = require('moment');
const auth = require("../middleware/auth");

// ==================================================
// Methods
// module.exports = {
//     findAll: function (req, res) {
//         db.Category
//             .find(req.query)
//             .then(dbCategory => res.json(dbCategory))
//             .catch( error => res.status(422).json(error) );
//     },

//     findById: function (req, res) {
//         db.Category
//             .findById(req.params.id)
//             .then(dbCategory => res.json(dbCategory))
//             .catch(error => res.status(422).json(error));
//     },

//     create: function (req, res) {
//         db.Category
//             .create(req.body)
//             .then(dbCategory => res.json(dbCategory))
//             .catch(error => res.status(422).json(error));
//     },

//     update: function (req, res) {
//         db.Category
//             .findOneAndUpdate({ _id: req.params.id }, req.body)
//             .then(dbCategory => res.json(dbCategory))
//             .catch(error => res.status(422).json(error));
//     },

//     remove: function (req, res) {
//         db.Category
//             .findById({ _id: req.params.id })
//             .then(dbCategory => dbCategory.remove())
//             .then(dbCategory => res.json(dbCategory))
//             .catch(error => res.status(422).json(error));
//     }
// };
// ==================================================