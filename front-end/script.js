let sendButton = document.getElementById('sendButton');
let categoryInfo = document.getElementById('Category');
let limitInfo = document.getElementById('Limit');
let testOk = document.getElementById('testOk');
let test = document.getElementById('test');
let budgetCreated =document.getElementById('budgetCreated');
let getBudgets = document.getElementById('getBudgets');
let budgetRequested = document.getElementById('budgetRequested');
let getId = document.getElementById('getId');
let getBudgetsId = document.getElementById('getBudgetsId');
let withdrawId = document.getElementById('withdrawId');
let withdrawIdButton = document.getElementById('withdrawIdButton');
let deleteId = document.getElementById('deleteId');
let deleteIdButton = document.getElementById('deleteIdButton');
let moveFromId = document.getElementById('moveFromId');
let moveToId = document.getElementById('moveToId');
let moveBudgetButton = document.getElementById('moveBudgetButton');


const testConection = async () => {
    try {
        const response = await fetch('http://localhost:3000');
        console.log(response);
        if(response.ok) {
            const textResponse = await response.text();
            testOk.innerHTML = textResponse;
        } else { 
            throw new Error('Request failed.');
        }
    } catch(error){
        console.log(error);
        testOk.innerHTML = error;
    }
}

const createBudget = async () => {
    const category = categoryInfo.value;
    const limit = parseInt(limitInfo.value);
    try {
        const response = await fetch('http://localhost:3000/envelops', 
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify({Category: category, Limit: limit})
            }
        )
        if(response.ok) {
            const jsonResponse = await response.json();
         //   console.log(jsonResponse);
            budgetCreated.value=JSON.stringify(jsonResponse, null, 2);
        } else {
            throw new Error('Request Failed! Fill in the fields correctly.');
        }
    } catch(error) {
      //  console.log(error);
        budgetCreated.value=error;
    }
}

const requestBudgets = async () => {
    try {
        const response = await fetch('http://localhost:3000/envelops');
        //console.log(response);
        if(response.ok) {
            const jsonResponse = await response.json();
            budgetRequested.value = JSON.stringify(jsonResponse, null, 2);
        } else { 
            throw new Error('Request failed. No budgets envelops created.');
        }
    } catch(error){
    //    console.log(error);
        budgetRequested.value=error;
    }
}

const getBudgetById = async () => {
    let url = 'http://localhost:3000/envelops/';
    let id = getId.value;
    let urlFull = url + id;
    //console.log(urlFull);
    try {
        const response = await fetch(urlFull);
       // console.log(response);
        if(response.ok) {
            const jsonResponse = await response.json();
            budgetRequested.value = JSON.stringify(jsonResponse, null, 2);
        } else { 
            throw new Error('Request failed. The id does not exists.');
        }
    } catch(error){
        console.log(error);
        budgetRequested.value=error;
    }
}

const withdrawIdFunction = async () => {
    let url = 'http://localhost:3000/envelops/';
    let id = getId.value + '/';
    let withdrawal = withdrawId.value;
    let urlFull = url + id + withdrawal;
    //console.log(urlFull);
    try {
        const response = await fetch(urlFull, 
            {
                method: 'PUT'
            }
        );
       // console.log(response);
        if(response.ok) {
            const jsonResponse = await response.json();
            budgetRequested.value = JSON.stringify(jsonResponse, null, 2);
        } else { 
            throw new Error('Request failed. Not enough founds to withdraw.');
        }
    } catch(error){
        console.log(error);
        budgetRequested.value=error;
    }
}

const deleteIdButtonFunction = async () => {
    let url = 'http://localhost:3000/envelops/';
    let id = deleteId.value;
    let urlFull = url + id;
    //console.log(urlFull);
    try {
        const response = await fetch(urlFull, 
            {
                method: 'DELETE'
            });
       // console.log(response);
        if(response.ok) {
            const textResponse = await response.text();
            budgetRequested.value = textResponse;
        } else { 
            throw new Error('Request failed. The id does not exists.');
        }
    } catch(error){
        console.log(error);
        budgetRequested.value=error;
    }
}

const moveBudgetFunction = async () => {
    let url = 'http://localhost:3000/envelops/transfer/'
    let moveFrom = moveFromId.value + '/';
    let moveTo = moveToId.value; 
    let urlFull = url + moveFrom + moveTo;
    try {
        const response = await fetch(urlFull, 
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                  }
            }
        )
        if(response.ok) {
            const jsonResponse = await response.json();
         //   console.log(jsonResponse);
            budgetRequested.value=JSON.stringify(jsonResponse, null, 2);
        } else {
            throw new Error('Request Failed!');
        }
    } catch(error) {
      //  console.log(error);
        budgetRequested.value=error;
    }
}


test.addEventListener('click', testConection);
sendButton.addEventListener('click', createBudget);
getBudgets.addEventListener('click', requestBudgets);
getBudgetsId.addEventListener('click', getBudgetById);
withdrawIdButton.addEventListener('click', withdrawIdFunction);
deleteIdButton.addEventListener('click', deleteIdButtonFunction);
moveBudgetButton.addEventListener('click', moveBudgetFunction);