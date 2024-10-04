let sendButton = document.getElementById('sendButton');
let categoryInfo = document.getElementById('Category');
let limitInfo = document.getElementById('Limit');
let parrafo = document.getElementById('parr');



const createBudget = async () => {
    try {
        const response = await fetch('http://localhost:3000');
        console.log(response);
        if(response.ok) {
            const textResponse = await response.text();
            parrafo.innerHTML = textResponse;
        } else { 
        throw new Error('Request failed.');
        }
    } catch(error){
        console.log(error);
    }
}


sendButton.addEventListener('click', createBudget);