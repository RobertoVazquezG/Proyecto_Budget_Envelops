let sendButton = document.getElementById('sendButton');
let categoryInfo = document.getElementById('Category');
let limitInfo = document.getElementById('Limit');
let testOk = document.getElementById('testOk');
let test = document.getElementById('test');


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
        } else {
            throw new Error('Request Failed!');
        }
    } catch(error) {
        console.log(error);
    }
}


test.addEventListener('click', testConection);
sendButton.addEventListener('click', createBudget);