// Este archivo es para crear un budget envelope
const  express = require("express");
const router = express.Router();

let budget_Array = [];

app.post ('/envelops', (req, res, next) => {
    const newBudget = req.body;
    res.status(201).send();
});