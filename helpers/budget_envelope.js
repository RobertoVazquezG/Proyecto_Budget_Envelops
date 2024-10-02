// Este archivo es para crear un budget envelope
const  express = require("express");
const routerEnvelop = express.Router();

let budget_Array = [];

let lengthArray = 1;

routerEnvelop.post ('/', (req, res, next) => {
    const newBudget = req.body;
    newBudget.id = lengthArray;
    budget_Array.push(newBudget);
    lengthArray++;
    res.status(201).send(newBudget);
    console.log(newBudget);
});

routerEnvelop.get('/', (req, res, next) => {
    if(budget_Array.length > 0) {
        res.send(budget_Array);
    } else {
        res.status(404).send('No items');
    }
});

module.exports = routerEnvelop;