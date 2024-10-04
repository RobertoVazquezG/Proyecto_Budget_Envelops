let sendButton = document.getElementById('sendButton');
let categoryInfo = document.getElementById('Category');
let limitInfo = document.getElementById('Limit');
let testOk = document.getElementById('testOk');
let test = document.getElementById('test');
let budgetCreated =document.getElementById('budgetCreated');
let getBudgets = document.getElementById('getBudgets');
let budgetRequested = document.getElementById('budgetRequested');


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
            console.log(jsonResponse);
            budgetCreated.value=JSON.stringify(jsonResponse, null, 2);
        } else {
            throw new Error('Request Failed!');
        }
    } catch(error) {
        console.log(error);
        budgetCreated.value=error;
    }
}

const requestBudgets = async () => {
    try {
        const response = await fetch('http://localhost:3000/envelops');
        console.log(response);
        if(response.ok) {
            const jsonResponse = await response.json();
            budgetRequested.value = JSON.stringify(jsonResponse, null, 2);
        } else { 
        throw new Error('Request failed. No budgets envelops created.');
        }
    } catch(error){
        console.log(error);
        budgetRequested.value=error;
    }
}

test.addEventListener('click', testConection);
sendButton.addEventListener('click', createBudget);
getBudgets.addEventListener('click', requestBudgets);