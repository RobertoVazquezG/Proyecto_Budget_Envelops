// Este archivo es para crear un budget envelop
const  express = require("express");
const routerEnvelop = express.Router();

let budget_Array = [];

let lengthArray = 1;

routerEnvelop.post ('/', (req, res, next) => {
    const newBudget = req.body;
    if(typeof newBudget.Category === 'string' && newBudget.Category !== "" && typeof newBudget.Limit === 'number'){
        newBudget.id = lengthArray;
        budget_Array.push(newBudget);
        lengthArray++;
        res.status(201).send(newBudget);
        console.log(newBudget);
    } else {
        res.status(400).send();
    }
});

routerEnvelop.get('/', (req, res, next) => {
    if(budget_Array.length > 0) {
        res.send(budget_Array);
    } else {
        res.status(404).send('No items');
    }
});

routerEnvelop.get('/:id', (req, res, next) => {
    const budgetId = req.params.id;
    const found = budget_Array.find(element => element.id === parseInt(budgetId));
    if (found) {
        res.send(found);
    } else {
        res.status(404).send("The id does not exists.");
    }
});

routerEnvelop.put('/:id/:withdraw', (req, res, next) => {
    const budgetId = parseInt(req.params.id);
    const withdrawal = parseInt(req.params.withdraw);
    const found = budget_Array.find(element => element.id === budgetId);
    if (found && typeof withdrawal === 'number' && withdrawal <= found.Limit) {
        found.Limit = found.Limit - withdrawal;
        res.send(found);
    } else {
        res.status(400).send(`The request cannot be proccesed or don't have sufficient founds.`);
    }
});

routerEnvelop.delete('/:id', (req, res, next) => {
    const budgetId = parseInt(req.params.id);
    const foundIndex = budget_Array.findIndex(element => element.id === budgetId);
    console.log(foundIndex);
    if (foundIndex !== -1) {
        budget_Array.splice(foundIndex, 1);
        res.status(200).send("Item deleted correctly.");
    } else {
        res.status(404).send("The item does not exists. Try with a diferent id.");
    }
});

routerEnvelop.post('/transfer/:from/:to', (req, res, next) => {
    const budgetFrom = parseInt(req.params.from);
    const budgetTo = parseInt(req.params.to);
    const foundFrom = budget_Array.find(element => element.id === budgetFrom);
    const foundTo = budget_Array.find(element => element.id === budgetTo);
    if(foundFrom && foundTo && foundFrom.Limit > 0 ) {
        foundTo.Limit = foundTo.Limit + foundFrom.Limit;
        foundFrom.Limit = 0;
        res.status(200).send(foundTo);
    } else {
        res.status(400).send("You cannot perform this action or have insufficient founds.");
    }
});

module.exports = routerEnvelop;